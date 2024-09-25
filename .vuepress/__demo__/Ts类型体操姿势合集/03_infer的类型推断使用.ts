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
