import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function RubricPage() {
  const content = getContent("rubric");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
