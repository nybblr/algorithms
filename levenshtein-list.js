let memoize = (keyGenerator, op) => {
  let cache = {};
  return (...args) => {
    let key = keyGenerator(...args);
    if (!cache.hasOwnProperty(key)) {
      let result = op(...args);
      cache[key] = result;
    }
    return cache[key];
  };
};

let keyGenerator = (a, b, x, y) => `${x},${y}`;

let Diff = () => {
  let diff = memoize(keyGenerator, (a, b, x, y) => {
    if (!x) { return y; }
    if (!y) { return x; }

    let del = diff(a, b, x - 1, y) + 1;
    let ins = diff(a, b, x, y - 1) + 1;
    let sub = diff(a, b, x - 1, y - 1)
      + (a[x - 1] === b[y - 1] ? 0 : 1);

    return Math.min(del, ins, sub);
  });
  return diff;
};

let diff = (a, b, x, y) => Diff()(a, b, a.length, b.length);

let charDiff = (a, b) => diff([...a], [...b]);

const assert = require('assert');

assert.deepEqual(charDiff('', ''), 0);
assert.deepEqual(charDiff('h', 'h'), 0);
assert.deepEqual(charDiff('hello', 'hello'), 0);
assert.deepEqual(charDiff('hello', 'helo'), 1);
assert.deepEqual(charDiff('helo', 'hello'), 1);
assert.deepEqual(charDiff('hey', 'hay'), 1);
assert.deepEqual(charDiff('kitty', 'kitten'), 2);
assert.deepEqual(charDiff('hello', 'hi'), 4);
assert.deepEqual(charDiff('actually', 'factual'), 3);

assert.deepEqual(diff([0], [1]), 1);
assert.deepEqual(diff([0,1], [1]), 1);
assert.deepEqual(diff([0,1,2], [1]), 2);
assert.deepEqual(diff([0,1,2], [1]), 2);
assert.deepEqual(diff([0,1,2], [1,2]), 1);
assert.deepEqual(diff([0,1,2,3,4,5,6], [1,2,4,5]), 3);
