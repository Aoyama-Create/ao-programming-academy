import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage8Week30Page() {
  const content = getContent("stage8-week30");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
