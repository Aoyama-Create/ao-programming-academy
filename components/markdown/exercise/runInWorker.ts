/*
 * 学習者の JavaScript を Web Worker 内で実行する。
 *
 * Worker を使う理由:
 *  - メインスレッドを止めないので、実行中も UI が固まらない。
 *  - タイムアウトで worker.terminate() でき、無限ループを確実に止められる。
 *    （第1週の教材は while(true) の無限ループを警告しており、学習者は実際に書く）
 *
 * console.log / console.error を上書きして postMessage で親へ送り、
 * それを仮想ターミナルの標準出力として扱う。
 */

export type RunResult = {
  stdout: string[];
  error?: string;
  timedOut: boolean;
};

// Worker の中身。文字列として Blob 化して起動する。
const WORKER_SOURCE = `
self.onmessage = function (e) {
  var code = e.data.code;
  var args = e.data.args || [];
  var lines = [];

  function format(args) {
    return args
      .map(function (a) {
        if (typeof a === "string") return a;
        try {
          return JSON.stringify(a);
        } catch (_) {
          return String(a);
        }
      })
      .join(" ");
  }

  var patched = {
    log: function () { lines.push(format([].slice.call(arguments))); },
    error: function () { lines.push(format([].slice.call(arguments))); },
    warn: function () { lines.push(format([].slice.call(arguments))); },
    info: function () { lines.push(format([].slice.call(arguments))); },
    debug: function () { lines.push(format([].slice.call(arguments))); },
  };

  // 最小限の process。argv は Node に合わせて ["node","main.js", ...args]。
  var proc = { argv: ["node", "main.js"].concat(args) };

  try {
    // console と process だけを差し替えた関数スコープで実行する。
    var fn = new Function("console", "process", code);
    fn(patched, proc);
    self.postMessage({ ok: true, stdout: lines });
  } catch (err) {
    self.postMessage({
      ok: false,
      stdout: lines,
      error: (err && err.name ? err.name + ": " : "") + (err && err.message ? err.message : String(err)),
    });
  }
};
`;

export function runUserCode(
  code: string,
  timeoutMs: number,
  args: string[] = []
): Promise<RunResult> {
  return new Promise((resolve) => {
    let worker: Worker | null = null;
    let url: string | null = null;
    let done = false;

    const cleanup = () => {
      if (worker) {
        worker.terminate();
        worker = null;
      }
      if (url) {
        URL.revokeObjectURL(url);
        url = null;
      }
    };

    const timer = setTimeout(() => {
      if (done) return;
      done = true;
      cleanup();
      resolve({ stdout: [], timedOut: true });
    }, timeoutMs);

    try {
      const blob = new Blob([WORKER_SOURCE], { type: "application/javascript" });
      url = URL.createObjectURL(blob);
      worker = new Worker(url);

      worker.onmessage = (
        e: MessageEvent<{ ok: boolean; stdout: string[]; error?: string }>
      ) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        const data = e.data;
        cleanup();
        resolve({
          stdout: data.stdout ?? [],
          error: data.ok ? undefined : data.error,
          timedOut: false,
        });
      };

      worker.onerror = (e) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        cleanup();
        resolve({
          stdout: [],
          error: e.message || "実行中にエラーが発生しました。",
          timedOut: false,
        });
      };

      worker.postMessage({ code, args });
    } catch (e) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      cleanup();
      resolve({
        stdout: [],
        error: e instanceof Error ? e.message : String(e),
        timedOut: false,
      });
    }
  });
}
