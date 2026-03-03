# 第 10 週：フォーム設計、バリデーション、エラーハンドリング

**目安時間**: 約 10 時間（解説・手順・演習）

---

## 学習目標

この週が終わると、次のことができるようになります。

- **制御コンポーネント**でフォームの状態管理ができる
- **バリデーション**とエラーメッセージ表示を実装できる
- 送信とエラー表示の流れを一貫して書ける

---

## 1. フォームの状態管理（制御コンポーネント）

React では、入力欄の値を **state** で持ち、その state を `value` に渡して表示します。こうした「React の state が入力値の唯一の情報源」となる入力欄を **制御コンポーネント** といいます。

### 基本的な流れ

1. `useState` で入力値用の state を用意する
2. `<input value={state} onChange={...} />` で、表示と更新を state に結びつける
3. `onChange` で `setState` を呼び、入力のたびに state を更新する

```tsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");

return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="名前"
    />
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="メール"
    />
    <button type="submit">送信</button>
  </form>
);
```

### 送信の処理

`onSubmit` でフォーム送信時の処理を書きます。`e.preventDefault()` を呼ぶと、ブラウザのデフォルトの送信動作（ページ遷移）を止められます。

```tsx
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  // ここでバリデーションや API 送信を行う
}
```

---

## 2. バリデーション

送信前に、入力が条件を満たしているかを **バリデーション**（検証）します。よくあるパターンは次のとおりです。

- **必須**: 空でないこと
- **形式**: メールアドレス・電話番号など
- **長さ**: 最小・最大文字数

### バリデーションの例

```tsx
const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

function validate(): boolean {
  const newErrors: { name?: string; email?: string } = {};

  if (!name.trim()) {
    newErrors.name = "名前を入力してください";
  }

  if (!email.trim()) {
    newErrors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "正しい形式のメールアドレスを入力してください";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!validate()) return;
  // 送信処理
}
```

### エラーメッセージの表示

各入力欄の近くに、対応するエラーがあれば表示します。

```tsx
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
  aria-invalid={!!errors.name}
/>
{errors.name && <span className="error">{errors.name}</span>}
```

---

## 3. エラーハンドリング

送信先（API など）でエラーが起きたときも、ユーザーに分かる形で伝える必要があります。

### try / catch とエラー状態

非同期で API を呼ぶ場合、`try` / `catch` で例外を捕まえ、エラー用の state にメッセージを入れます。

```tsx
const [submitError, setSubmitError] = useState<string | null>(null);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!validate()) return;

  setSubmitError(null);
  try {
    await sendToApi({ name, email });
    // 成功時の処理（例：完了メッセージ、リセット）
  } catch (err) {
    setSubmitError("送信に失敗しました。しばらくしてから再度お試しください。");
  }
}
```

フォームの上や下に、`submitError` があれば表示するブロックを置きます。

---

## 4. 演習：バリデーションとエラー表示付きフォーム

次の仕様のフォームを 1 つ実装してください。

- **項目**: 名前（必須）、メールアドレス（必須・形式チェック）、備考（任意・最大 200 文字）
- **バリデーション**: 送信時に上記の条件をチェックし、違反があれば該当項目の下にエラーメッセージを表示する
- **送信**: バリデーション通過後は、いったん `console.log` で送信データを出すか、モックの「送信成功」で完了メッセージを表示する。失敗をシミュレートする場合は、送信処理内で `throw new Error(...)` し、catch でエラーメッセージを表示する

---

## 5. 目安時間の内訳（第 10 週）

| 内容 | 目安 |
|------|------|
| 制御コンポーネント・onSubmit の解説を読む・試す | 2〜3 時間 |
| バリデーション・エラー表示のパターンを読む・試す | 2〜3 時間 |
| エラーハンドリング（try/catch）を試す | 1〜2 時間 |
| 演習（ユーザー登録風フォーム） | 3〜4 時間 |

---

**前**: [第 9 週：TypeScript 基礎・React コンポーネント・JSX](/stage3/week9)  
**次**: [第 11 週：API 連携・型駆動開発](/stage3/week11)
