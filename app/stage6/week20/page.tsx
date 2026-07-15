import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage6Week20Page() {
  const content = getContent("stage6-week20");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
