# Stage 1 第 1 週：演習課題 解答例

以下は、第 1 週の演習課題の解答例です。採点・解説用の参照です。

---

## 課題 1：偶数判定

```javascript
const n = 4; // または 7 で試す

if (n % 2 === 0) {
  console.log("偶数です");
} else {
  console.log("奇数です");
}
```

---

## 課題 2：1 から N までの合計

```javascript
const n = 5;
let sum = 0;

for (let i = 1; i <= n; i++) {
  sum = sum + i;
}

console.log(sum); // 15
```

---

## 課題 3：FizzBuzz の一部（1〜15）

```javascript
for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
```

---

## 課題 4：九九の一段目

```javascript
const k = 3;

for (let i = 1; i <= 9; i++) {
  console.log(k * i);
}
```

---

## 課題 5：小さい方の数

```javascript
const a = 10;
const b = 7;

if (a < b) {
  console.log(a);
} else {
  console.log(b);
}
// 7 が表示される
```

---

## 採点のポイント

- 変数・分岐・ループが仕様どおり使えているか。
- 期待する出力になっているか（n や a, b を変えて確認できるとよい）。
