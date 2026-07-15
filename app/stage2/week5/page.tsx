import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage2Week5Page() {
  const content = getContent("stage2-week5");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
