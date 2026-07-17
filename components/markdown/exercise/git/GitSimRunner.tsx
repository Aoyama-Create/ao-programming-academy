"use client";

import { useRef, useState } from "react";
import { Button, Group } from "@mantine/core";
import {
  parseGitSimSpec,
  matchesStep,
  stepDisplay,
  type GitSimSpec,
} from "./types";

// ターミナルに積む 1 行分の履歴。
type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "err"; text: string };

export function GitSimRunner({ spec: raw }: { spec: string }) {
  const parsed = parseGitSimSpec(raw);
  if (!parsed.ok) {
    return (
      <div className="mermaid-error">
        <strong>演習の読み込みエラー:</strong> {parsed.error}
        <pre>{raw}</pre>
      </div>
    );
  }
  return <Runner spec={parsed.spec} />;
}

function Runner({ spec }: { spec: GitSimSpec }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const done = stepIndex >= spec.steps.length;
  const current = done ? null : spec.steps[stepIndex];

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      const el = bodyRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  const submit = () => {
    const cmd = input.trim();
    if (!cmd || done || !current) return;

    const next: Line[] = [...lines, { kind: "cmd", text: cmd }];
    if (matchesStep(cmd, current)) {
      if (current.output) {
        for (const line of current.output.split("\n")) {
          next.push({ kind: "out", text: line });
        }
      }
      setLines(next);
      setStepIndex(stepIndex + 1);
    } else {
      next.push({
        kind: "err",
        text: "そのコマンドは今のステップと違うようです。上の「次にやること」を確認してください。",
      });
      setLines(next);
    }
    setInput("");
    setShowHint(false);
    scrollToEnd();
  };

  const handleReset = () => {
    setLines([]);
    setStepIndex(0);
    setInput("");
    setShowHint(false);
    inputRef.current?.focus();
  };

  return (
    <section className="exercise-card">
      <header className="exercise-head">
        <span className="exercise-badge">演習</span>
        <h4 className="exercise-title">{spec.title}</h4>
      </header>

      {spec.prompt && <p className="exercise-prompt">{spec.prompt}</p>}

      <div className="gitsim-status">
        <span className="gitsim-progress">
          {Math.min(stepIndex + 1, spec.steps.length)} / {spec.steps.length}
        </span>
        {current ? (
          <span className="gitsim-instruction">
            <strong>次にやること：</strong>
            {current.instruction}
          </span>
        ) : (
          <span className="gitsim-instruction">すべてのステップが完了しました。</span>
        )}
      </div>

      <div className="exercise-terminal" ref={bodyRef}>
        {spec.intro && <div className="exercise-terminal-dim">{spec.intro}</div>}
        {lines.map((l, i) => {
          if (l.kind === "cmd") {
            return (
              <div key={i} className="exercise-terminal-line">
                <span className="gitsim-prompt-mark">$</span> {l.text}
              </div>
            );
          }
          if (l.kind === "err") {
            return (
              <div key={i} className="exercise-terminal-error">
                {l.text}
              </div>
            );
          }
          return (
            <div key={i} className="exercise-terminal-line">
              {l.text === "" ? " " : l.text}
            </div>
          );
        })}

        {!done && (
          <div className="gitsim-inputline">
            <span className="gitsim-prompt-mark">$</span>
            <input
              ref={inputRef}
              className="gitsim-input"
              value={input}
              spellCheck={false}
              autoComplete="off"
              placeholder="ここにコマンドを入力して Enter"
              aria-label="git コマンド入力"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
            />
          </div>
        )}
      </div>

      <Group gap="sm" mt="sm">
        {!done && (
          <>
            <Button size="sm" color="teal" onClick={submit}>
              実行
            </Button>
            <Button
              size="sm"
              variant="light"
              color="gray"
              onClick={() => setShowHint((v) => !v)}
            >
              ヒント
            </Button>
          </>
        )}
        <Button size="sm" variant="default" onClick={handleReset}>
          リセット
        </Button>
      </Group>

      {showHint && current && (
        <p className="gitsim-hint">
          このステップの入力例：<code>{stepDisplay(current)}</code>
        </p>
      )}

      {done && (
        <div className="exercise-result pass">
          ✓ 完了です！{spec.steps.length} 個のコマンドを順番に実行できました。
        </div>
      )}
    </section>
  );
}
