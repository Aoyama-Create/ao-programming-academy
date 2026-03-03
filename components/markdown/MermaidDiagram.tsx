"use client";

import { useEffect, useId, useState } from "react";

type MermaidDiagramProps = {
  chart: string;
};

let mermaidInitialized = false;

function ensureMermaidInitialized(mermaid: { initialize: (config: Record<string, unknown>) => void }) {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    securityLevel: "loose",
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: "basis",
      diagramPadding: 20,
      wrappingWidth: 280,
    },
    themeVariables: {
      fontSize: "16px",
      fontFamily: "inherit",
    },
  });
  mermaidInitialized = true;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chart.trim()) return;

    let cancelled = false;

    import("mermaid")
      .then((mermaidModule) => {
        const mermaid = mermaidModule.default;
        ensureMermaidInitialized(mermaid);
        const uniqueId = `mermaid-${id}-${Math.random().toString(36).slice(2, 9)}`;
        return mermaid.render(uniqueId, chart);
      })
      .then((result) => {
        if (!cancelled && result.svg) {
          setSvg(result.svg);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message ?? "Mermaid render failed");
          setSvg(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="my-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
        <strong>図の描画エラー:</strong> {error}
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs">{chart}</pre>
      </div>
    );
  }

  if (svg) {
    return (
      <div
        className="mermaid-wrapper my-6 w-full overflow-auto rounded-lg border border-gray-200 bg-white p-6 [&_svg]:min-w-[320px] [&_svg]:overflow-visible [&_svg_.node]:overflow-visible [&_svg_.nodeLabel]:overflow-visible"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  return (
    <div
      style={{ margin: "1.5rem 0", minHeight: 80, borderRadius: 8, background: "#f3f4f6" }}
      aria-busy="true"
    />
  );
}
