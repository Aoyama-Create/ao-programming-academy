import { createHmac, timingSafeEqual } from "crypto";

export const INSTRUCTOR_COOKIE_NAME = "instructor_verified";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // 1 day

function getSecret(): string {
  const secret = process.env.INSTRUCTOR_PASSWORD ?? process.env.INSTRUCTOR_SECRET ?? "";
  return secret || "fallback-do-not-use-in-production";
}

/**
 * 署名付きトークンを生成する（有効期限を含む）。
 */
export function createSignedToken(): string {
  const expiry = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE_SECONDS;
  const payload = `${expiry}`;
  const secret = getSecret();
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

/**
 * 署名付きトークンを検証する。有効期限内かつ署名が正しければ true。
 */
export function verifySignedToken(value: string): boolean {
  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expiry = parseInt(payload, 10);
  if (Number.isNaN(expiry) || expiry < Date.now() / 1000) return false;
  const secret = getSecret();
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

/**
 * リクエストの Cookie ヘッダーから講師認証済みかどうかを判定する。
 */
export function isInstructorVerified(cookieHeader: string | null | undefined): boolean {
  if (!cookieHeader) return false;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${INSTRUCTOR_COOKIE_NAME}=`)) {
      const value = cookie.slice(INSTRUCTOR_COOKIE_NAME.length + 1).trim();
      return verifySignedToken(value);
    }
  }
  return false;
}

export function getInstructorCookieAttributes(): { maxAge: number; httpOnly: boolean; secure: boolean; sameSite: "strict" } {
  return {
    maxAge: COOKIE_MAX_AGE_SECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
}
