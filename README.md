# memo

Memoization with shallowly comparing object arguments.

```sh
npm i @luwes/memo
```

```js
import memo from '@luwes/memo';

let called = 0
const memoized = memo(
  a => {
    called++
    return a
  }
)
let obj = { a: 9 }
console.log(memoized(obj) === obj)
console.log(memoized({ a: 9 }) === obj)
console.log(called === 1)

let obj2 = { a: 7 }
console.log(memoized(obj2) === obj2)
console.log(called === 2)
```
