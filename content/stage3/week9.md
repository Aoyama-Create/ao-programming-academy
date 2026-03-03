# 第 9 週：TypeScript 基礎（型・interface）、React コンポーネント・JSX

**目安時間**: 約 10 時間（解説・手順・演習）

---

## 学習目標

この週が終わると、次のことができるようになります。

- **型注釈**と **interface** で TypeScript の基礎を説明し、コードで使える
- **React の関数コンポーネント**と **JSX** を書ける
- 型付きの **props** を持つコンポーネントを 2〜3 個作り、1 画面に組み合わせられる

---

## 1. TypeScript の基礎

### 型とは

TypeScript は、JavaScript に**型**を付けて書けるようにした言語です。変数や関数の「どんな値が入るか」を宣言しておくことで、間違った型の値を代入したり、存在しないプロパティにアクセスしたりするミスを、実行前に検出できます。

### 基本的な型

| 型 | 説明 | 例 |
|----|------|-----|
| `string` | 文字列 | `"hello"` |
| `number` | 数値 | `42`, `3.14` |
| `boolean` | 真偽値 | `true`, `false` |
| `string[]` | 文字列の配列 | `["a", "b"]` |
| `number[]` | 数値の配列 | `[1, 2, 3]` |

変数に型を付けるには、変数名のうしろに `: 型` を書きます。

```ts
const name: string = "太郎";
const age: number = 18;
const isActive: boolean = true;
const scores: number[] = [80, 90, 70];
```

### interface（インターフェース）

オブジェクトの「形」を決めるときは **interface** を使います。どのプロパティが必須か、どんな型かが一目で分かります。

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "山田太郎",
  email: "yamada@example.com",
};
```

プロパティを省略可能にしたい場合は `?` を付けます。

```ts
interface Product {
  id: number;
  name: string;
  description?: string;  // 省略可能
}
```

### strict の考え方

TypeScript の `strict` オプションを有効にすると、`null` や `undefined` の扱いが厳しくなり、より安全なコードを書けます。教材用のプロジェクトでは、初期設定のまま `strict: true` にしておくことをおすすめします。

---

## 2. React の環境構築

ここでは **Vite + React + TypeScript** でプロジェクトを作る手順を説明します。既に別の方法（Create React App など）で環境がある場合は、そのまま使ってかまいません。

### プロジェクトの作成

ターミナルで、プロジェクトを置きたいフォルダに移動してから、次のコマンドを実行します。

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

- `my-app` は好きな名前に変えてかまいません。
- `--template react-ts` で、React と TypeScript が入ったテンプレートが選ばれます。

### 起動と確認

```bash
npm run dev
```

ブラウザで表示される URL（多くの場合 `http://localhost:5173`）を開き、Vite の初期画面が出れば成功です。

---

## 3. コンポーネントと JSX

### 関数コンポーネント

React では、画面の一部を **コンポーネント** という単位に分けて書きます。**関数コンポーネント**は、関数を 1 つ定義し、その中で JSX を return する形です。

```tsx
function Greeting() {
  return <p>こんにちは</p>;
}
```

### JSX の書き方

JSX は、JavaScript のなかで HTML のようなタグを書くための記法です。

- タグは必ず閉じる（`<br />` のようにするか、`<div>...</div>` で囲む）
- 複数の要素を返すときは、1 つの親要素でまとめる（または `<>...</>` の Fragment を使う）
- クラス名は `class` ではなく `className` で指定する
-  JavaScript の式を埋め込むときは `{ }` を使う

```tsx
function Greeting() {
  const name = "太郎";
  return (
    <div className="greeting">
      <p>こんにちは、{name} さん</p>
    </div>
  );
}
```

### props の型付け

コンポーネントに「外から渡す値」を **props** といいます。TypeScript では、props の形を interface で定義します。

```tsx
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <p>
      こんにちは、{name} さん
      {age !== undefined && `（${age} 歳）`}
    </p>
  );
}
```

親コンポーネントからは、次のように渡します。

```tsx
<Greeting name="花子" age={20} />
```

---

## 4. 演習：型付きコンポーネントを組み合わせる

次の 3 つを作成し、1 つの画面に並べて表示してみましょう。

1. **Card コンポーネント**  
   props: `title: string`, `children: React.ReactNode`。`title` を見出しに、`children` を中身として表示する。

2. **UserProfile コンポーネント**  
   props: `User` 型のオブジェクト（`id`, `name`, `email`）。名前とメールを表示する。

3. **ItemList コンポーネント**  
   props: `items: string[]`。配列の要素を `<ul><li>...</li></ul>` で一覧表示する。

`App.tsx` で、上記のコンポーネントに適当なデータを渡してレンダリングし、ブラウザで表示を確認してください。

---

## 5. 目安時間の内訳（第 9 週）

| 内容 | 目安 |
|------|------|
| TypeScript の型・interface の解説を読む・試す | 2〜3 時間 |
| Vite + React + TS の環境構築 | 1 時間 |
| コンポーネント・JSX・props の解説を読む・試す | 2〜3 時間 |
| 演習（Card / UserProfile / ItemList） | 2〜3 時間 |

---

**次**: [第 10 週：フォーム設計、バリデーション、エラーハンドリング](/stage3/week10)
