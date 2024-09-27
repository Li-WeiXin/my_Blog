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
