import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage2Week4Page() {
  const content = getContent("stage2-week4");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
