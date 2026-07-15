import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function HomePage() {
  const content = getContent("index");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
