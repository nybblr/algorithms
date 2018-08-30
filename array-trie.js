const intRegex = /^(0|[1-9]\d*)$/;

let isIndex = prop =>
  typeof prop === 'string'
  && intRegex.test(prop);

let concat = (left, right) => {
  let w = left.length;
  let h = right.length;

  let getTarget = i => {
    let isLeft = i < w;
    let target = isLeft ? left : right;
    let prop = isLeft ? i : i - w;
    return [ target, prop ];
  };

  let indexForward = trap => (target, prop, ...rest) =>
    isIndex(prop) ?
      Reflect[trap](...getTarget(prop), ...rest)
    :
      Reflect[trap](target, prop, ...rest)

  let getForward = indexForward('get');
  let handler = {
    get: (target, prop, receiver) =>
      prop === 'length' ?
        w + h
      :
        getForward(target, prop, receiver)
    ,
    ownKeys: (target) => {
      let keys = [];
      for (let i = 0; i < w + h; i++) {
        keys.push(String(i));
      }
      keys.push('length');
      return keys;
    },
    has: indexForward('has'),
    getOwnPropertyDescriptor: indexForward('getOwnPropertyDescriptor')
  };

  return new Proxy([], handler);
};

let a = [1,2,3];
let b = [4,5,6,7];

let c = concat(a, b);

const assert = require('assert');

assert.deepEqual(c[0], 1);
assert.deepEqual(c[2], 3);
assert.deepEqual(c[3], 4);
assert.deepEqual(c[6], 7);
assert.deepEqual(c[8], undefined);
assert.deepEqual(c.length, 7);

assert.deepEqual(Object.keys(c), ['0','1','2','3','4','5','6']);
assert.deepEqual(Object.getOwnPropertyNames(c), ['0','1','2','3','4','5','6', 'length']);

assert.deepEqual('0' in c, true);
assert.deepEqual('2' in c, true);
assert.deepEqual('3' in c, true);
assert.deepEqual('6' in c, true);
assert.deepEqual('8' in c, false);

assert.deepEqual([...c], [1,2,3,4,5,6,7]);
assert.deepEqual(c.slice(), [1,2,3,4,5,6,7]);
assert.deepEqual(c.map(x => x), [1,2,3,4,5,6,7]);
assert.deepEqual(c, [1,2,3,4,5,6,7]);

let copy = [];
for (let num of c) { copy.push(num); }
assert.deepEqual(copy, [1,2,3,4,5,6,7]);

let d = [8,9,10];

let e = concat(c, d);

assert.deepEqual([...e], [1,2,3,4,5,6,7,8,9,10]);
