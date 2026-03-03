"use server";

import { cookies } from "next/headers";
import {
  INSTRUCTOR_COOKIE_NAME,
  createSignedToken,
  getInstructorCookieAttributes,
} from "@/lib/instructor-auth";

export async function verifyInstructorPassword(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const password = formData.get("password");
  const expected = process.env.INSTRUCTOR_PASSWORD;

  if (!expected) {
    return { success: false, error: "講師用パスコードが設定されていません。" };
  }

  if (typeof password !== "string" || password.trim() === "") {
    return { success: false, error: "パスコードを入力してください。" };
  }

  if (password !== expected) {
    return { success: false, error: "パスコードが正しくありません。" };
  }

  const token = createSignedToken();
  const attrs = getInstructorCookieAttributes();
  const cookieStore = await cookies();
  cookieStore.set(INSTRUCTOR_COOKIE_NAME, token, attrs);

  return { success: true };
}
