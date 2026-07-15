import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage5Week19Page() {
  const content = getContent("stage5-week19");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
