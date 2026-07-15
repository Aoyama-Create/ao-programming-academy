import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage6Week21Page() {
  const content = getContent("stage6-week21");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
