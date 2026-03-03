# 第 11 週：API 連携（モックまたは MSW）、型駆動開発

**目安時間**: 約 10 時間（解説・手順・演習）

---

## 学習目標

この週が終わると、次のことができるようになります。

- フロントから **API を呼び出し**、レスポンスを**型付き**で扱える
- **モック**または **MSW** で、バックエンドがなくても開発・テストを進められる
- **型定義を先に書き**、実装を型に沿わせる**型駆動**の流れを体験する

---

## 1. API 連携の基本

フロントエンドから API を呼ぶときは、多くの場合 `fetch` または axios を使います。ここでは `fetch` を前提に説明します。

### fetch で GET する

```ts
const response = await fetch("/api/items");
const data = await response.json();
```

`response.ok` が `false` のとき（4xx, 5xx）はエラーとして扱うとよいです。

```ts
if (!response.ok) {
  throw new Error(`API error: ${response.status}`);
}
const data = await response.json();
```

### レスポンスの型を付ける

`data` がどんな形か、**interface** で定義しておくと、そのあとのコードで補完や型チェックが効きます。

```ts
interface Item {
  id: number;
  name: string;
  price: number;
}

const response = await fetch("/api/items");
if (!response.ok) throw new Error("Failed to fetch");
const data: Item[] = await response.json();
```

### loading と error の状態

API 呼び出し中は「読み込み中」、失敗したら「エラー」を表示するために、state で状態を持ちます。

```tsx
const [items, setItems] = useState<Item[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  let cancelled = false;
  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/items");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Item[] = await res.json();
      if (!cancelled) setItems(data);
    } catch (e) {
      if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      if (!cancelled) setLoading(false);
    }
  }
  load();
  return () => { cancelled = true; };
}, []);
```

---

## 2. モックと MSW

バックエンド（Stage 4 で作る API）がまだないあいだ、フロントだけ進めるために **モック**（偽のデータ・偽の API）を使います。

### 簡単なモック

- **静的な JSON を返す**: `fetch("/api/items")` の代わりに、最初から `Item[]` の配列を import して使う。
- **setTimeout で遅延**: 通信の待ち時間を再現する。

```ts
const MOCK_ITEMS: Item[] = [
  { id: 1, name: "商品A", price: 1000 },
  { id: 2, name: "商品B", price: 2000 },
];

// 疑似的な API 呼び出し
const fetchItems = (): Promise<Item[]> =>
  new Promise((resolve) => setTimeout(() => resolve(MOCK_ITEMS), 500));
```

### MSW（Mock Service Worker）とは

**MSW** は、ブラウザの「サービスワーカー」を使って、実際の `fetch` を横取りし、決まったレスポンスを返す仕組みです。フロントのコードは本物の `fetch("/api/items")` のまま書いておき、MSW がその URL に反応してモックデータを返します。バックエンドができたあとは MSW をオフにするだけで、同じコードが本物の API を叩けます。

MSW を使う場合の流れ（概要）:

1. `msw` をインストールする
2. ハンドラを定義する（例: `http.get('/api/items', () => Response.json([...])`）
3. 開発時だけ `worker.start()` で有効にする

教材では「モック用の関数を用意して fetch の代わりに呼ぶ」だけでも十分です。MSW まで試す場合は、公式ドキュメントを参照してください。

---

## 3. 型駆動開発

**型駆動**とは、先に「API のレスポンスはこういう形」「画面で使うデータはこの interface」と型を決めてから、コンポーネントや API 呼び出しを書くやり方です。

### 手順の例

1. **API の型を定義する**  
   例: `Item`, `ItemListResponse` などを `types/item.ts` に書く。
2. **API を呼ぶ関数の戻り値をその型にする**  
   `fetchItems(): Promise<Item[]>` のようにする。
3. **コンポーネントでその型を使う**  
   `items: Item[]` を props で受け取り、表示する。

こうすると、「API の形が変わったら型定義を直す → 型に合わせてコンポーネントを直す」という流れになり、抜け漏れが減ります。

---

## 4. 演習：一覧取得 API（モック）で型付き一覧表示

次の内容で 1 画面作ってください。

1. **型の定義**  
   `Item`（id, name, price など）を interface で定義する。
2. **モック API**  
   上記の「簡単なモック」のように、`Item[]` を返す非同期関数を用意する（setTimeout で 0.5 秒遅延させてよい）。
3. **一覧画面**  
   `useEffect` でモック API を呼び、`loading` / `error` / `items` の 3 状態を扱う。  
   - loading 中は「読み込み中」、error 時はメッセージ表示、成功時は `items` を表形式またはリストで表示する。
4. **型の一貫性**  
   一覧表示コンポーネントの props は `Item[]` とし、型定義 1 か所で形を管理する。

---

## 5. 目安時間の内訳（第 11 週）

| 内容 | 目安 |
|------|------|
| fetch・型付きレスポンス・loading/error の解説を読む・試す | 2〜3 時間 |
| モック・MSW の考え方を読む | 1 時間 |
| 型駆動の流れを読む・型を先に書いてみる | 1〜2 時間 |
| 演習（一覧取得・型付き表示） | 4〜5 時間 |

---

**前**: [第 10 週：フォーム設計、バリデーション、エラーハンドリング](/stage3/week10)  
**次**: [第 12 週：管理画面 CRUD・複雑フォームの課題](/stage3/week12)
