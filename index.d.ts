type Func = (...args: any[]) => any;

interface MemoizeFunc {
  <F extends Func>(fn: F): F;
}

export const memo: MemoizeFunc;
