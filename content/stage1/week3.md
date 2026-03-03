# 第 3 週：1 言語で小さなプログラムを完成させる（CLI ツール）

**目安時間**: 約 10 時間（仕様の理解・設計・実装・動作確認）

---

## 学習目標

この週が終わると、次のことができるようになります。

- 変数・分岐・ループ・関数を組み合わせて、一つの CLI プログラムを完成させる
- コマンドライン引数（`process.argv`）を読んで、プログラムの動作を変えられる

---

## 課題：簡易計算機（CLI）

### 仕様

**題材**: 簡易計算機  
ターミナルから「演算子」と「2 つの数」を渡すと、計算結果を表示するプログラムを作成します。

**実行例**

```bash
node calc.js add 10 3
# 出力: 13

node calc.js subtract 10 3
# 出力: 7

node calc.js multiply 10 3
# 出力: 30

node calc.js divide 10 3
# 出力: 3.333...（割り算の結果）
```

**必須要件**

1. **コマンドライン引数の読み取り**: `process.argv` を使って、演算の種類（add / subtract / multiply / divide）と 2 つの数を受け取ること。
2. **分岐**: 演算子に応じて、足し算・引き算・かけ算・割り算のどれを行うか `if` / `else if` で分岐すること。
3. **ループ**: 仕様では「2 つの数」だが、余力があれば「複数の数を足す」などループを使った処理を 1 つ含めるとよい（必須ではない）。
4. **関数**: 計算処理を関数にまとめること。例：`add(a, b)`、`subtract(a, b)` など。
5. **実行手順**: `node calc.js 演算子 数1 数2` で実行できること。

**制約**

- 外部パッケージ（npm で入れるライブラリ）は使わない。Node.js の組み込みだけを使う。

**補足**

- `process.argv` は配列です。`process.argv[0]` は `node`、`process.argv[1]` は `calc.js`、その次からがユーザーが渡した引数です。つまり `process.argv[2]` が演算子、`process.argv[3]` と `process.argv[4]` が数です。
- 引数は文字列として渡されるので、数値に変換するには `Number(process.argv[3])` のようにします。
- 引数が足りない場合（例：演算子しか渡していない）は、エラーメッセージを表示して終了するようにすると親切です。

---

## ステップ案（進め方）

1. **仕様理解**: 上記の「実行例」と「必須要件」を読み、何を入力して何を出力するか整理する。
2. **入出力の整理**: 入力（引数）と出力（表示する内容）をメモやコメントで書いてからコードを書き始める。
3. **小さく動かす**: まず「引数をそのまま表示する」だけのプログラムを書き、`node calc.js add 10 3` で `add`, `10`, `3` が取れているか確認する。
4. **機能を追加して完成**: 演算子ごとの分岐と計算用の関数を追加し、最後にエラー処理（引数不足など）を入れる。

---

## 評価ポイント（修了チェックとの対応）

- 変数・分岐・ループ・関数が使われているか。
- 仕様どおり `node calc.js 演算子 数1 数2` で動作するか。
- コードは「動けばよい」だけでなく、自分や他人が読みやすいか（関数名や変数名が分かりやすいか、長すぎる処理を関数に分けているか）を少し意識するとよいです。

---

## 解答例（仕様を満たす一例）

以下は、仕様を満たすコードの一例です。写経ではなく「こういう形でよい」という参照用です。自分なりの書き方で完成させたあと、比較用に眺めてみてください。

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

- 計算処理を `add` / `subtract` / `multiply` / `divide` の関数にまとめている。
- 分岐で演算子に応じた処理を選んでいる。
- 引数不足・数値でない入力・0 で割る場合にエラーメッセージを出して終了している。
- ループは必須ではないが、余力があれば「複数個の数を足す」などで `for` を使った拡張をしてみるとよいです。

---

## Stage 1 修了後

第 3 週の課題が完成したら、[Stage 1 修了チェック](/stage1#stage-1-修了チェック) で自分で確認し、問題なければ **Stage 2** に進みましょう。Stage 2 では Git を学ぶので、この CLI ツールをリポジトリに commit するのがおすすめです。

---

**前**: [第 2 週](/stage1/week2) | [Stage 1 トップ](/stage1)
