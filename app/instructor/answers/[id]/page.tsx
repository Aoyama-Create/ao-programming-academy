import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isInstructorVerified } from "@/lib/instructor-auth";
import { getInstructorContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

type PageProps = { params: Promise<{ id: string }> };

export default async function InstructorAnswerPage({ params }: PageProps) {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");
  if (!isInstructorVerified(cookieHeader)) {
    redirect("/instructor");
  }

  const { id } = await params;
  const content = getInstructorContent(id);
  if (content === null) {
    notFound();
  }

  return (
    <main className="page-main">
      <p className="text-sm text-gray-600 mb-4">
        <Link href="/instructor" className="page-link">
          ← 解答一覧に戻る
        </Link>
      </p>
      <MarkdownRenderer content={content} />
    </main>
  );
}
