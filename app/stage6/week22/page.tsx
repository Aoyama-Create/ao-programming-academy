import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage6Week22Page() {
  const content = getContent("stage6-week22");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
