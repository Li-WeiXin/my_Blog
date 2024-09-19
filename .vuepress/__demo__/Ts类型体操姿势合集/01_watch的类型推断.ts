type Watcher<T> = {
  on<K extends string & keyof T>(
    eventName: `${K}Changed`,
    callback: (oldValue: T[K], newValue: T[K]) => void
  ): void;
};

// 声明一个名为 watch 的函数。该函数接受一个类型为 T 的参数 obj，并返回一个 Watcher<T> 类型的值。
declare function watch<T>(obj: T): Watcher<T>;

const personWatcher = watch({
  firstName: 'Simon',
  lastName: 'Roman',
  age: 26,
  sex: '男',
  level: 2,
});

personWatcher.on(
  "ageChanged",
  (oldValue, newValue) => {

  }
)