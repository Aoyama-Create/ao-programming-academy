import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage4Week17Page() {
  const content = getContent("stage4-week17");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
