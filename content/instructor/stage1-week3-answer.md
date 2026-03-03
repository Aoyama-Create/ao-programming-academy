# Stage 1 第 3 週：解答例（仕様を満たす一例）

以下は、簡易計算機（CLI）の仕様を満たすコードの一例です。採点・解説用の参照です。

```javascript
// calc.js - 簡易計算機（CLI）
// 実行: node calc.js add 10 3

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    console.error("エラー: 0 で割れません");
    process.exit(1);
  }
  return a / b;
}

function main() {
  const args = process.argv;

  if (args.length < 5) {
    console.error("使い方: node calc.js <演算子> <数1> <数2>");
    console.error("例: node calc.js add 10 3");
    process.exit(1);
  }

  const op = args[2];
  const a = Number(args[3]);
  const b = Number(args[4]);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error("エラー: 数値を指定してください");
    process.exit(1);
  }

  let result;

  if (op === "add") {
    result = add(a, b);
  } else if (op === "subtract") {
    result = subtract(a, b);
  } else if (op === "multiply") {
    result = multiply(a, b);
  } else if (op === "divide") {
    result = divide(a, b);
  } else {
    console.error("エラー: 未知の演算子です。add / subtract / multiply / divide のいずれかを指定してください。");
    process.exit(1);
  }

  console.log(result);
}

main();
```

## 採点のポイント

- 計算処理を `add` / `subtract` / `multiply` / `divide` の関数にまとめている。
- 分岐で演算子に応じた処理を選んでいる。
- 引数不足・数値でない入力・0 で割る場合にエラーメッセージを出して終了している。
- ループは必須ではないが、余力があれば「複数個の数を足す」などで `for` を使った拡張をしているとよい。
