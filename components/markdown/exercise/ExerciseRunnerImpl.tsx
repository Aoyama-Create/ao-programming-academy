"use client";

import { useRef, useState } from "react";
import { Button, Group } from "@mantine/core";
import {
  parseExerciseSpec,
  grade,
  toRunCases,
  type ExerciseSpec,
  type GradeResult,
} from "./types";
import { runUserCode } from "./runInWorker";
import { formatCode } from "./formatCode";

// 1 ケースの実行結果。argv を使わない課題は args=[] の 1 ケースとして扱う。
type CaseOutcome = {
  args: string[];
  stdout: string[];
  error?: string;
  timedOut: boolean;
  grade: GradeResult;
};

type Status =
  | { phase: "idle" }
  | { phase: "running" }
  | { phase: "done"; outcomes: CaseOutcome[]; allPass: boolean };

// 最初に失敗したケースから、結果バナー用のメッセージを組み立てる。
function failMessage(outcomes: CaseOutcome[], multi: boolean): string {
  const fail = outcomes.find((o) => o.timedOut || o.error || !o.grade.pass);
  if (!fail) return "";
  const label = multi ? `「${fail.args.join(" ")}」で: ` : "";
  if (fail.timedOut) {
    return `✗ ${label}時間切れ（無限ループの可能性があります）`;
  }
  if (fail.error) {
    return `✗ ${label}エラーが出ました。ターミナルの内容を確認してください。`;
  }
  const hint = fail.grade.pass ? "" : fail.grade.hint;
  return `✗ もう少し。${label}${hint}`;
}

export function ExerciseRunnerImpl({ spec: raw }: { spec: string }) {
  const parsed = parseExerciseSpec(raw);

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

function Runner({ spec }: { spec: ExerciseSpec }) {
  const [code, setCode] = useState(spec.starter);
  const [status, setStatus] = useState<Status>({ phase: "idle" });
  const [formatting, setFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // コードを差し替えつつ、キャレット位置を指定位置に戻す（再描画後に反映）。
  const setCodeAndCursor = (nextCode: string, cursorPos: number) => {
    setCode(nextCode);
    const el = textareaRef.current;
    requestAnimationFrame(() => {
      if (el) el.selectionStart = el.selectionEnd = cursorPos;
    });
  };

  const baseCommand = spec.command ?? "node main.js";
  const timeoutMs = spec.timeoutMs ?? 2000;
  const multi = !!(spec.cases && spec.cases.length > 0);

  // 1 ケースの実行コマンド表示（例: "node calc.js add 10 3"）。
  const caseCommand = (args: string[]) =>
    args.length > 0 ? `${baseCommand} ${args.join(" ")}` : baseCommand;

  const handleRun = async () => {
    setStatus({ phase: "running" });
    const runCases = toRunCases(spec);
    const outcomes: CaseOutcome[] = [];
    for (const rc of runCases) {
      const result = await runUserCode(code, timeoutMs, rc.args);
      const g: GradeResult =
        result.timedOut || result.error
          ? { pass: false, hint: "" }
          : grade(rc.expected, result.stdout.join("\n"));
      outcomes.push({
        args: rc.args,
        stdout: result.stdout,
        error: result.error,
        timedOut: result.timedOut,
        grade: g,
      });
    }
    const allPass = outcomes.every(
      (o) => !o.timedOut && !o.error && o.grade.pass
    );
    setStatus({ phase: "done", outcomes, allPass });
  };

  const handleReset = () => {
    setCode(spec.starter);
    setStatus({ phase: "idle" });
    setFormatError(null);
    textareaRef.current?.focus();
  };

  const handleFormat = async () => {
    setFormatError(null);
    setFormatting(true);
    const result = await formatCode(code);
    setFormatting(false);
    if (result.ok) {
      setCode(result.code);
    } else {
      setFormatError("整形できませんでした。コードの文法を確認してください。");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    const start = el.selectionStart;
    const end = el.selectionEnd;

    // Tab: フォーカスを移さず 2 スペースを挿入する。
    if (e.key === "Tab") {
      e.preventDefault();
      setCodeAndCursor(code.slice(0, start) + "  " + code.slice(end), start + 2);
      return;
    }

    // Enter: 現在行のインデントを引き継ぐ。開き括弧の直後なら 1 段深くし、
    // 直後に対応する閉じ括弧があれば間に空行を作って閉じ括弧を 1 段戻す。
    if (e.key === "Enter") {
      e.preventDefault();
      const before = code.slice(0, start);
      const after = code.slice(end);
      const curLine = before.slice(before.lastIndexOf("\n") + 1);
      const indent = (curLine.match(/^[ \t]*/) ?? [""])[0];
      const prevChar = before.slice(-1);
      const nextChar = after.slice(0, 1);
      const pairs: Record<string, string> = { "{": "}", "(": ")", "[": "]" };

      if (prevChar in pairs) {
        const deeper = indent + "  ";
        if (pairs[prevChar] === nextChar) {
          const insert = "\n" + deeper + "\n" + indent;
          setCodeAndCursor(before + insert + after, start + 1 + deeper.length);
        } else {
          const insert = "\n" + deeper;
          setCodeAndCursor(before + insert + after, start + insert.length);
        }
        return;
      }

      const insert = "\n" + indent;
      setCodeAndCursor(before + insert + after, start + insert.length);
    }
  };

  return (
    <section className="exercise-card">
      <header className="exercise-head">
        <span className="exercise-badge">演習</span>
        <h4 className="exercise-title">{spec.title}</h4>
      </header>

      {spec.prompt && <p className="exercise-prompt">{spec.prompt}</p>}

      <textarea
        ref={textareaRef}
        className="exercise-editor"
        value={code}
        spellCheck={false}
        rows={Math.max(6, code.split("\n").length + 1)}
        onChange={(e) => {
          setCode(e.target.value);
          if (formatError) setFormatError(null);
        }}
        onKeyDown={handleKeyDown}
        aria-label="コードエディタ"
      />

      {formatError && <p className="exercise-format-error">{formatError}</p>}

      <Group gap="sm" mt="sm">
        <Button
          size="sm"
          color="teal"
          onClick={handleRun}
          loading={status.phase === "running"}
        >
          ▶ 実行
        </Button>
        <Button
          size="sm"
          variant="light"
          color="gray"
          onClick={handleFormat}
          loading={formatting}
        >
          整形
        </Button>
        <Button size="sm" variant="default" onClick={handleReset}>
          リセット
        </Button>
      </Group>

      <div className="exercise-terminal" aria-live="polite">
        {status.phase !== "done" && (
          <div className="exercise-terminal-prompt">$ {baseCommand}</div>
        )}
        {status.phase === "running" && (
          <div className="exercise-terminal-dim">実行中...</div>
        )}
        {status.phase === "done" &&
          status.outcomes.map((o, ci) => (
            <div key={ci} className="exercise-terminal-case">
              <div className="exercise-terminal-prompt">
                $ {caseCommand(o.args)}
              </div>
              {o.stdout.map((line, i) => (
                <div key={i} className="exercise-terminal-line">
                  {line === "" ? " " : line}
                </div>
              ))}
              {o.error && (
                <div className="exercise-terminal-error">{o.error}</div>
              )}
              {o.timedOut && (
                <div className="exercise-terminal-error">
                  時間切れ（無限ループの可能性があります）
                </div>
              )}
            </div>
          ))}
      </div>

      {status.phase === "done" && (
        <div
          className={
            status.allPass ? "exercise-result pass" : "exercise-result fail"
          }
        >
          {status.allPass
            ? multi
              ? `✓ 正解です！全 ${status.outcomes.length} ケースが期待どおりでした。`
              : "✓ 正解です！期待どおりの出力になりました。"
            : failMessage(status.outcomes, multi)}
        </div>
      )}
    </section>
  );
}
