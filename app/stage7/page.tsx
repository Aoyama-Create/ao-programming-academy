import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage7Page() {
  const content = getContent("stage7");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
