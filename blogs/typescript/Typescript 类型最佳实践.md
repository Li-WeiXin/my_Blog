---
title: Typescript 类型最佳实践
date: 2024-09-18
categories:
  - typescript
tags:
  - typescript
sidebar: 'auto'
---

Ts 中的一些最佳实践沉淀
### 1.实现对象的可选类型

```typescript
interface ComplexObject {
  mandatory: string;
  option?: number;
  option2?: string;
}

type GetOptional<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};

let keys: GetOptional<ComplexObject>;
```

### 2.watch 的类型最佳实践

```typescript
type Watcher<T> = {
  on<K extends string & keyof T>(
    eventName: `${K}Changed`,
    callback: (oldValue: T[K], newValue: T[K]) => void
  ): void;
};

// 声明一个名为 watch 的函数。该函数接受一个类型为 T 的参数 obj，并返回一个 Watcher<T> 类型的值。
declare function watch<T>(obj: T): Watcher<T>;

// string & keyof T 用来排除symbol类型
const personWatcher = watch({
  firstName: 'Simon',
  lastName: 'Roman',
  age: 26,
  sex: '男',
  level: 2,
});

personWatcher.on('ageChanged', (oldValue, newValue) => {});
```
