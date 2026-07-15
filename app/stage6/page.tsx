import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage6Page() {
  const content = getContent("stage6");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
