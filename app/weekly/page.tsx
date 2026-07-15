import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function WeeklyPage() {
  const content = getContent("weekly-curriculum");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
