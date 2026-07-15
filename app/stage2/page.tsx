import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage2Page() {
  const content = getContent("stage2");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
