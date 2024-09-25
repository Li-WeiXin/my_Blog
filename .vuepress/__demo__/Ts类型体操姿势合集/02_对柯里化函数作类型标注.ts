/**
 * () => R
 * (X) => R
 * (X) => Function
 */
type Curried<A, R> = A extends []
  ? () => R
  : A extends [infer ARG]
  ? (param: ARG) => R
  : A extends [infer ARG, ...infer REST]
  ? (param: ARG) => Curried<REST, R>
  : never;

declare function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curried<A, R>;

function sum(a: number, b: object) {
  return 1223;
}

const currySum = curry(sum);
currySum(12)({});
