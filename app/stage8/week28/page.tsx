import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage8Week28Page() {
  const content = getContent("stage8-week28");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
