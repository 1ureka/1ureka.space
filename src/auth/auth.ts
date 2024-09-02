import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/data/db";
import { decryptAesGcm, encryptAesGcm } from "./crypto";
import { generateKey, hashPassword } from "./crypto";

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("Missing secret");

type SignUp = (password: string) => Promise<void>;
type SignIn = (password: string) => Promise<{ error?: string }>;
type SignOut = () => void;
type ValidateKey = (options?: { redirect?: boolean }) => null | string;
type EncryptImage = (image: Buffer, key: string) => Buffer | { error: string };
type DecryptImage = (image: Buffer, key: string) => Buffer | { error: string };

// 系統設計：
// 註冊：首先生成一個json，再用雜湊後的密碼加密json，最後將加密後的json存入資料庫。
// 登入：首先取得加密後的json，再用雜湊後的密碼解密json，最後取得json中的金鑰。
// 會話：將金鑰加密後存入cookie，每次驗證時取得cookie，解密金鑰，並使用金鑰進行加密與解密用戶資料。
// 登出：刪除cookie。

// 金鑰週期：
// 註冊：生成json > 用戶雜湊密碼加密 > 存入資料庫
// 登入：取得json > 用戶雜湊密碼解密 > 取得金鑰 > 環境變數加密 > 存入cookie
// 驗證：取得cookie > 環境變數解密 > 取得金鑰

// 相關文件：
// crypto.ts：加密演算法
// auth.ts：註冊、登入、登出、驗證邏輯
// server-actions.ts：登入、登出服務器邏輯
// AuthForm.tsx：註冊、登入表單，需要上層伺服器組件提供金鑰

/**
 * 註冊邏輯
 */
const signUp: SignUp = async (password) => {
  try {
    // 生成金鑰json
    const json = JSON.stringify({ status: "success", key: generateKey(64) });

    // 加密json
    const hashedPassword = hashPassword(password, SECRET);
    const buffer = encryptAesGcm(Buffer.from(json), hashedPassword);
    if (!buffer) {
      throw new Error("Failed to encrypt json");
    }

    // 存入資料庫
    await db.auth.create({ data: { bytes: buffer } });
  } catch (error) {
    throw new Error("Failed to sign up");
  }
};

/**
 * 登入邏輯，應該在`server action`中使用
 */
const signIn: SignIn = async (password) => {
  try {
    // 查詢註冊訊息
    const jsonBuffer = (await db.auth.findFirst())?.bytes;
    if (!jsonBuffer) {
      return { error: "No user found" };
    }

    // 解密訊息
    const hashedPassword = hashPassword(password, SECRET);
    let jsonString: Buffer | undefined;
    try {
      jsonString = decryptAesGcm(jsonBuffer, hashedPassword);
      if (!jsonString) return { error: "Password is incorrect" };
    } catch (error) {
      return { error: "Password is incorrect" };
    }

    // 解析訊息
    const json = JSON.parse(jsonString.toString()) as {
      status: string;
      key: string;
    };
    if (json?.status !== "success") {
      return { error: "Password is incorrect" };
    }

    // 加密金鑰，並設定cookie
    const token = encryptAesGcm(Buffer.from(json.key), SECRET);
    if (!token) {
      return { error: "Failed to encrypt token" };
    }

    cookies().set("token", token.toString("base64"), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 10 * 60,
      path: "/",
    });

    return {};
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

/**
 * 登出邏輯，應該在`server action`中使用
 */
const signOut: SignOut = () => {
  cookies().delete("token");
};

/**
 * 驗證金鑰邏輯，可以在`server action`, `server component`, `api`中使用。
 * 返回金鑰或者重導向到`/unAuth`
 */
const validateKey: ValidateKey = ({ redirect: r = true } = {}) => {
  try {
    // 取得cookie
    const tokenCookie = cookies().get("token");
    if (!tokenCookie) {
      if (r) redirect("/unAuth");
      return null;
    }

    // 解密金鑰
    const { value: token } = tokenCookie;
    const keyBuffer = decryptAesGcm(Buffer.from(token, "base64"), SECRET);

    if (!keyBuffer) {
      if (r) redirect("/unAuth");
      return null;
    }

    return keyBuffer.toString();
  } catch (error) {
    // decryptAesGcm 當金鑰不正確時會拋出錯誤
    if (r) redirect("/unAuth");
    return null;
  }
};

/**
 * 加密圖片
 */
const encryptImage: EncryptImage = (image, key) => {
  try {
    const buffer = encryptAesGcm(image, key + SECRET);
    if (!buffer) return { error: "Failed to encrypt image." };
    return buffer;
  } catch (error) {
    return { error: "Failed to encrypt image." };
  }
};

/**
 * 解密圖片
 */
const decryptImage: DecryptImage = (image, key) => {
  try {
    const buffer = decryptAesGcm(image, key + SECRET);
    if (!buffer) return { error: "Failed to decrypt image." };
    return buffer;
  } catch (error) {
    return { error: "Failed to decrypt image." };
  }
};

export { signUp, signIn, signOut, validateKey, encryptImage, decryptImage };
