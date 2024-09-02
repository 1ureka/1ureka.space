"use server";

import "server-only";
import { z } from "zod";
import { signIn as login, signOut as logout } from "./auth";
import { redirect } from "next/navigation";

/**
 * 登入。
 * @returns 成功時重導向到設定頁面，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function signIn(formData: FormData) {
  const { success, error, data } = z
    .string({ message: "Invalid password" })
    .min(1, { message: "Password is required" })
    .max(100, { message: "Password is too long" })
    .safeParse(formData.get("password"));

  if (!success) {
    return { error: error.issues.map(({ message }) => message) };
  }

  const response = await login(data);

  if (response.error) {
    return { error: [response.error] };
  }

  redirect("/settings");
}

/**
 * 登出。
 * @returns 成功時重導向到設定頁面。
 */
export async function signOut() {
  logout();

  redirect("/settings");
}
