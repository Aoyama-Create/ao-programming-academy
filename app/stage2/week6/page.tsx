import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage2Week6Page() {
  const content = getContent("stage2-week6");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
