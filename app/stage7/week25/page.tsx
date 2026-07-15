import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage7Week25Page() {
  const content = getContent("stage7-week25");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
