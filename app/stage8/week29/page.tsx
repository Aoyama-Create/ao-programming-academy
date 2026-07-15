import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage8Week29Page() {
  const content = getContent("stage8-week29");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
