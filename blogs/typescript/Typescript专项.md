---
title: Typescript专项
date: 2024-09-18
categories:
 - typescript
tags:
 - typescript
sidebar: 'auto'
---

### 获取对象的值：（实现 Pick）
```typescript
function getValue<T extends Object,K extends keyof T>(o: T,key: K): T[K] {
  return o[key]
}
const obj1 = { name: '张三',  age: 18}
const values = getValue(obj1, 'name')

```