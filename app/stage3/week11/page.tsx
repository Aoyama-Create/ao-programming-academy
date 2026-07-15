import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage3Week11Page() {
  const content = getContent("stage3-week11");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
