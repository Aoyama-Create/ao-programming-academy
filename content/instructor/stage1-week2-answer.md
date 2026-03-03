# Stage 1 第 2 週：演習課題 解答例

以下は、第 2 週の演習課題の解答例です。採点・解説用の参照です。

---

## 課題 1：関数化（sumTo）

```javascript
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum = sum + i;
  }
  return sum;
}

console.log(sumTo(5)); // 15
```

---

## 課題 2：配列の合計（sumArray）

```javascript
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total = total + arr[i];
  }
  return total;
}

console.log(sumArray([1, 2, 3, 4])); // 10
```

---

## 課題 3：配列の最大値（maxArray）

```javascript
function maxArray(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > result) {
      result = arr[i];
    }
  }
  return result;
}

console.log(maxArray([3, 7, 2, 9])); // 9
```

---

## 課題 4：条件に合う要素の個数（countGreaterThan）

```javascript
function countGreaterThan(arr, threshold) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > threshold) {
      count++;
    }
  }
  return count;
}

console.log(countGreaterThan([1, 5, 3, 8, 2], 4)); // 2
```

---

## 課題 5：条件を満たす要素を集める（filterTenAndOver）

```javascript
function filterTenAndOver(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 10) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(filterTenAndOver([3, 12, 7, 15, 9])); // [12, 15]
```

---

## 採点のポイント

- 関数の引数・戻り値が仕様どおりか。
- 配列とループを組み合わせて書けているか。
- 空配列や 1 要素の配列で maxArray などが動くか（課題 3 は「1 つ以上あると仮定」でよい）。
