---
title: Typescript 类型最佳实践
date: 2024-09-18
categories:
  - typescript
tags:
  - typescript
sidebar: 'auto'
---

TS 中的一些最佳实践沉淀
TS 类型安全，要保证类型始终可用

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

### 4.infer 的类型推断

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
### 5. 前置不定量参数
```typescript
// 处理(参数不定量,固定参数)
// 在一个函数签名里，它参数与参数之间，产生了某种类型关联，应该使用泛型

type JSTypeMap = {
  number: number;
  string: string;
  boolean: boolean;
};

type JSTypeName = keyof JSTypeMap;

type ArgsType<T extends JSTypeName[]> = {
  [I in keyof T]: JSTypeMap[T[I]];
};

declare function addImpl<T extends JSTypeName[]>(
  ...args: [...T, (...args: ArgsType<T>) => any]
): void;

addImpl('number', 'string', 'boolean', (a, b, c) => {});
```
