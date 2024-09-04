import "server-only";

import { redirect } from "next/navigation";
import { decryptAesGcm, encryptAesGcm, hashPassword } from "./crypto";
import NextAuth, { type Session } from "next-auth";
import GitHub from "next-auth/providers/github";
import type {} from "next-auth/jwt";

/**
 * 延伸`next-auth/jwt`和`next-auth`模組，添加`key`屬性
 */
declare module "next-auth/jwt" {
  interface JWT {
    key?: string;
  }
}

declare module "next-auth" {
  interface Session {
    key?: string;
  }
}

/**
 * 獲取環境變數
 */
const SECRET = process.env.AUTH_SECRET;
const USER_ID = process.env.USER_ID;
if (!SECRET || !USER_ID) {
  throw new Error("No secret provided for encryption.");
}

/**
 * NextAuth配置
 */
const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],

  // 會話配置
  session: {
    maxAge: 24 * 60 * 60,
  },

  // 防止自動生成的路由
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },

  callbacks: {
    // 登錄後檢查
    async signIn({ profile }) {
      if (!profile || !profile.id) {
        return false;
      }

      const id = JSON.stringify(profile.id);
      if (hashPassword(id, "") !== USER_ID) {
        return false;
      }

      return true;
    },
    // 生成jwt(登錄成功後)
    jwt({ token, profile }) {
      if (!profile || !profile.id) {
        return token;
      }

      // 由於會話是公開的，所以需要在jwt中先加密id
      const idString = JSON.stringify(profile.id);
      const idBuffer = Buffer.from(idString);
      const keyBuffer = encryptAesGcm(idBuffer, SECRET);
      if (!keyBuffer) {
        return token;
      }

      token.key = keyBuffer.toString("base64");
      return token;
    },
    // 生成會話(會暴露給客戶端)
    session({ session, token }) {
      if (!token.key) {
        return session;
      }

      session.key = token.key; //加密後的id作為金鑰
      return session;
    },
  },
});

/**
 * 包裝介面，確保整個應用程序的驗證邏輯一致
 */
type ValidateSession = (options?: {
  redirect?: boolean;
}) => Promise<Session | null>;
type EncryptImage = (image: Buffer) => Promise<Buffer | { error: string }>;
type DecryptImage = (image: Buffer) => Promise<Buffer | { error: string }>;

/**
 * 驗證邏輯，可以在`server action`, `server component`中使用。
 * 返回金鑰或者重導向到`/unAuth`
 */
const validateSession: ValidateSession = async ({
  redirect: r = true,
} = {}) => {
  try {
    // 獲取會話
    const session = await auth();
    if (!session || !session.key) {
      if (r) redirect("/unAuth");
      return null;
    }

    // 解密金鑰，獲取id
    const keyBuffer = Buffer.from(session.key, "base64");
    const idBuffer = decryptAesGcm(keyBuffer, SECRET);
    if (!idBuffer) {
      if (r) redirect("/unAuth");
      return null;
    }

    // 驗證id
    const id = idBuffer.toString();
    if (hashPassword(id, "") !== USER_ID) {
      if (r) redirect("/unAuth");
      return null;
    }

    return session;
  } catch (error) {
    if (r) redirect("/unAuth");
    return null;
  }
};

/**
 * 加密圖片
 */
const encryptImage: EncryptImage = async (image) => {
  try {
    // 驗證會話
    const session = await validateSession({ redirect: false });
    if (!session || !session.key) return { error: "Failed to encrypt image." };

    // 解密金鑰，獲取id
    const keyBuffer = Buffer.from(session.key, "base64");
    const idBuffer = decryptAesGcm(keyBuffer, SECRET);
    if (!idBuffer) return { error: "Failed to encrypt image." };

    // 生成金鑰，加密圖片
    const key = SECRET + hashPassword(idBuffer.toString(), "517");
    const buffer = encryptAesGcm(image, key);
    if (!buffer) return { error: "Failed to encrypt image." };

    return buffer;
  } catch (error) {
    return { error: "Failed to encrypt image." };
  }
};

/**
 * 解密圖片
 */
const decryptImage: DecryptImage = async (image) => {
  try {
    // 驗證會話
    const session = await validateSession({ redirect: false });
    if (!session || !session.key) return { error: "Failed to decrypt image." };

    // 解密金鑰，獲取id
    const keyBuffer = Buffer.from(session.key, "base64");
    const idBuffer = decryptAesGcm(keyBuffer, SECRET);
    if (!idBuffer) return { error: "Failed to decrypt image." };

    // 生成金鑰，解密圖片
    const key = SECRET + hashPassword(idBuffer.toString(), "517");
    const buffer = decryptAesGcm(image, key);
    if (!buffer) return { error: "Failed to decrypt image." };

    return buffer;
  } catch (error) {
    return { error: "Failed to decrypt image." };
  }
};

// 內部使用
export { signIn, signOut };
// 外部使用
export { handlers, validateSession, encryptImage, decryptImage };
