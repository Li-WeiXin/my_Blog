---
title: TypeScript 类型体操合集
date: 2024-09-18
categories:
  - typescript
tags:
  - typescript
sidebar: 'auto'
---

Ts 的作用：类型约束，编译时运行，有效降低出错的几率；
学习网站: https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

### 1.获取对象的值：（实现 Pick）

```typescript
function getValue<T extends Object, K extends keyof T>(o: T, key: K): T[K] {
  return o[key];
}
const obj1 = { name: '张三', age: 18 };
const values = getValue(obj1, 'name');
```

### 2.对象属性只读：(实现 ReadOnly)
```typescript
// 在一个对象接口里使用映射类型语法，
// 遍历T类型的每个键的字面类型，并在前面加上readonly修饰符。
type MyReadOnly<T> = {
  readonly [K in keyof T]: T[K]
}
```
