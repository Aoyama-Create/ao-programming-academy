# 第 2 週：関数、配列・リスト、簡単なアルゴリズム

**目安時間**: 約 10 時間（解説を読む・手を動かす・演習に取り組む）

---

## 学習目標

この週が終わると、次のことができるようになります。

- 関数を定義し、引数と戻り値を使って処理をまとめられる
- 配列（`[]`）の作成・アクセス・`length`・ループ（`for` でインデックス）を扱える
- 簡単なアルゴリズム（合計・最大値・検索・条件を満たす要素を集める）をコードで書ける

---

## 1. 関数

### 関数とは

**関数**は、処理をひとまとまりにしたものです。同じ処理を何度も書かずに、名前を付けて呼び出せるようにします。

### 関数の定義と呼び出し

```javascript
function greet(name) {
  return "こんにちは、" + name;
}

const message = greet("太郎");
console.log(message); // こんにちは、太郎
```

- `function 関数名(引数) { ... }` で関数を定義します。
- **引数**は、関数に渡す値です。`name` が引数です。
- `return` で、関数の**戻り値**（結果）を返します。return の後は実行されません。

### 引数が複数の場合

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(3, 5)); // 8
```

### スコープ（変数の見える範囲）

関数の内側で宣言した変数は、**その関数の内側だけで**有効です。外側からは参照できません。逆に、関数の外側で宣言した変数は、関数の内側から参照できます（ただし、できるだけ引数で渡す方が分かりやすいです）。

```javascript
const global = 10;

function example() {
  const local = 20;
  console.log(global); // 10 は見える
  console.log(local);   // 20
}
example();
// console.log(local);  // エラー。local は example の外から見えない
```

---

## 2. 配列（リスト）

### 配列とは

**配列**は、複数の値を 1 つの変数に順番に入れておくためのものです。`[]` で囲み、カンマで区切って書きます。

```javascript
const numbers = [10, 20, 30, 40];
const names = ["りんご", "ばなな", "みかん"];
```

### アクセス（インデックス）

配列の要素には **インデックス**（0 から始まる番号）でアクセスします。

```javascript
const arr = [10, 20, 30];
console.log(arr[0]); // 10（1 番目）
console.log(arr[1]); // 20（2 番目）
console.log(arr[2]); // 30（3 番目）
```

### length（要素の個数）

`配列.length` で、要素の個数が得られます。

```javascript
const arr = [5, 10, 15];
console.log(arr.length); // 3
```

### 配列とループの組み合わせ

配列の要素を先頭から順に扱うときは、`for` でインデックスを 0 から `length - 1` まで回します。

```javascript
const scores = [80, 90, 70, 85];

for (let i = 0; i < scores.length; i++) {
  console.log(i + " 番目: " + scores[i]);
}
```

---

## 3. 簡単なアルゴリズム

### 合計を求める

配列の要素をすべて足すには、変数に「これまでの合計」を覚えさせて、ループで足していきます。

```javascript
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total = total + arr[i];
  }
  return total;
}

console.log(sum([1, 2, 3, 4, 5])); // 15
```

### 最大値を求める

「今までで一番大きい値」を変数に覚えておき、ループで各要素と比べます。

```javascript
function max(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > result) {
      result = arr[i];
    }
  }
  return result;
}

console.log(max([3, 7, 2, 9, 1])); // 9
```

### 線形探索（ある値の位置を見つける）

先頭から順に「目的の値と等しいか」を調べます。

```javascript
function indexOf(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1; // 見つからなかったとき
}

console.log(indexOf(["a", "b", "c"], "b")); // 1
console.log(indexOf(["a", "b", "c"], "z")); // -1
```

### 条件を満たす要素を集める

「偶数だけ」「10 より大きい数だけ」のように、条件を満たす要素だけを新しい配列に入れます。

```javascript
function filterEven(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(filterEven([1, 2, 3, 4, 5, 6])); // [2, 4, 6]
```

`配列.push(値)` は、配列の末尾に要素を 1 つ追加するメソッドです。

---

## 4. 演習課題

### 課題 1：関数化（第 1 週の処理を関数に）

第 1 週で「1 から n までの合計」を書いたと思います。それを **関数 `sumTo(n)`** にしましょう。引数に `n` を受け取り、1 から n までの合計を **return** で返す関数を書き、`console.log(sumTo(5))` で 15 が表示されることを確認してください。

下のエディタで試してみましょう（確認用の `console.log` は用意してあります。関数の中身を書いてください）。

```exercise
{
  "id": "stage1-week2-sumto",
  "kind": "node-js",
  "title": "課題1: 関数 sumTo(n)",
  "prompt": "1 から n までの合計を return する関数 sumTo(n) を書く。console.log(sumTo(5)) で 15 になれば正解。",
  "starter": "function sumTo(n) {\n  // 1 から n までの合計を return する\n}\n\nconsole.log(sumTo(5));\n",
  "expected": "15"
}
```

---

### 課題 2：配列の合計

数値が入った配列を受け取り、**合計**を返す関数 `sumArray(arr)` を書きなさい。例：`sumArray([1, 2, 3, 4])` は `10` を返す。

```exercise
{
  "id": "stage1-week2-sumarray",
  "kind": "node-js",
  "title": "課題2: 配列の合計 sumArray(arr)",
  "prompt": "配列の合計を return する関数 sumArray(arr) を書く。console.log(sumArray([1,2,3,4])) で 10 になれば正解。",
  "starter": "function sumArray(arr) {\n  // 配列の合計を return する\n}\n\nconsole.log(sumArray([1, 2, 3, 4]));\n",
  "expected": "10"
}
```

---

### 課題 3：配列の最大値

数値が入った配列を受け取り、**最大値**を返す関数 `maxArray(arr)` を書きなさい。例：`maxArray([3, 7, 2, 9])` は `9` を返す。配列の要素が 1 つ以上あると仮定してよい。

```exercise
{
  "id": "stage1-week2-maxarray",
  "kind": "node-js",
  "title": "課題3: 配列の最大値 maxArray(arr)",
  "prompt": "配列の最大値を return する関数 maxArray(arr) を書く。console.log(maxArray([3,7,2,9])) で 9 になれば正解。",
  "starter": "function maxArray(arr) {\n  // 配列の最大値を return する\n}\n\nconsole.log(maxArray([3, 7, 2, 9]));\n",
  "expected": "9"
}
```

---

### 課題 4：条件に合う要素の個数

数値の配列と「しきい値」を受け取り、**しきい値より大きい要素の個数**を返す関数 `countGreaterThan(arr, threshold)` を書きなさい。例：`countGreaterThan([1, 5, 3, 8, 2], 4)` は `2`（5 と 8 の 2 個）を返す。

```exercise
{
  "id": "stage1-week2-count",
  "kind": "node-js",
  "title": "課題4: 条件に合う要素の個数 countGreaterThan(arr, threshold)",
  "prompt": "threshold より大きい要素の個数を return する関数を書く。console.log(countGreaterThan([1,5,3,8,2], 4)) で 2 になれば正解。",
  "starter": "function countGreaterThan(arr, threshold) {\n  // threshold より大きい要素の個数を return する\n}\n\nconsole.log(countGreaterThan([1, 5, 3, 8, 2], 4));\n",
  "expected": "2"
}
```

---

### 課題 5：条件を満たす要素を集める

数値の配列を受け取り、**10 以上の要素だけ**を入れた新しい配列を返す関数 `filterTenAndOver(arr)` を書きなさい。例：`filterTenAndOver([3, 12, 7, 15, 9])` は `[12, 15]` を返す。

下の確認用コードは、返ってきた配列を `join(",")` でつないで表示します（`12,15` と出れば正解です）。

```exercise
{
  "id": "stage1-week2-filter",
  "kind": "node-js",
  "title": "課題5: 条件を満たす要素を集める filterTenAndOver(arr)",
  "prompt": "10 以上の要素だけの新しい配列を return する関数を書く。確認用に join(\",\") で表示し、12,15 になれば正解。",
  "starter": "function filterTenAndOver(arr) {\n  // 10 以上の要素だけの新しい配列を return する\n}\n\n// 確認用：返ってきた配列をカンマ区切りで表示します\nconsole.log(filterTenAndOver([3, 12, 7, 15, 9]).join(\",\"));\n",
  "expected": "12,15"
}
```

---

## 目安時間の内訳（第 2 週）

| 内容 | 目安 |
|------|------|
| 解説を読む・コード例を写して実行してみる | 3〜4 時間 |
| 演習課題に取り組む | 5〜6 時間 |
| 見直し・復習 | 1 時間程度 |

---

**前**: [第 1 週](/stage1/week1) | **次**: [第 3 週：CLI ツールを完成させる](/stage1/week3)
