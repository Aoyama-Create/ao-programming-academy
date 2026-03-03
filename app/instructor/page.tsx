import { headers } from "next/headers";
import Link from "next/link";
import { isInstructorVerified } from "@/lib/instructor-auth";
import { InstructorLoginForm } from "./InstructorLoginForm";

const ANSWER_LINKS = [
  { id: "stage1-week3-answer", label: "Stage 1 第 3 週：簡易計算機（CLI）解答例" },
] as const;

export default async function InstructorPage() {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");
  const verified = isInstructorVerified(cookieHeader);

  if (verified) {
    return (
      <main className="max-w-2xl px-4 py-6">
        <h1 className="text-xl font-semibold mb-4">講師用：解答一覧</h1>
        <p className="text-sm text-gray-600 mb-6">
          以下のリンクから各課題の解答を確認できます。採点の参考にしてください。
        </p>
        <ul className="list-disc list-inside space-y-2">
          {ANSWER_LINKS.map(({ id, label }) => (
            <li key={id}>
              <Link href={`/instructor/answers/${id}`} className="text-blue-600 underline hover:text-blue-800">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  }

  return (
    <main className="max-w-2xl px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">講師・採点者用</h1>
      <InstructorLoginForm />
    </main>
  );
}
