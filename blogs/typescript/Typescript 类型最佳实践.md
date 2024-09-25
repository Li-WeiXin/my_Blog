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

### 3.对柯里化函数做类型标注

### 4.infer的类型推断
```typescript
// 1.传入一个泛型函数，可以拿到函数的返回结果
type Return<T> = T extends (...args: any[]) => infer R ? R : T;
type sum = (a: number, b: number) => number;
type concat = (a: any[], b: any[]) => any[];

let sumResult: Return<sum>;
let concatResult: ReturnType<concat>;

// 2.传入一个Promise,将Promise内的泛型取出
type PromiseType<T> = T extends Promise<infer K> ? PromiseType<K> : T;

type pt = PromiseType<Promise<Promise<string>>>;

// 3.传入一个函数,获得这个函数第一个参数的类型
type FirstArg<T> = T extends (first: infer F, ...args: any[]) => any ? F : T;
type fa = FirstArg<(name: string, age: number) => void>;

// 4.传入一个数组,获得这个数组每一项是什么类型
type ArrayType<T> = T extends (infer I)[] ? I : T;

type ItemType1 = ArrayType<[string, number]>;
type ItemType2 = ArrayType<string[]>;

```