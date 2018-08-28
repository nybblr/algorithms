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

let keyGenerator = (a, b) => [a, b].sort().join(',');

let lvs = memoize(keyGenerator, (a, b) => {
  if (!a) { return b.length; }
  if (!b) { return a.length; }

  let del = lvs(a.slice(1), b) + 1;
  let ins = lvs(b.slice(1), a) + 1;
  let sub = lvs(a.slice(1), b.slice(1))
    + (a[0] === b[0] ? 0 : 1);

  return Math.min(del, ins, sub);
});

const assert = require('assert');

assert.deepEqual(lvs('', ''), 0);
assert.deepEqual(lvs('h', 'h'), 0);
assert.deepEqual(lvs('hello', 'hello'), 0);
assert.deepEqual(lvs('hello', 'helo'), 1);
assert.deepEqual(lvs('helo', 'hello'), 1);
assert.deepEqual(lvs('hey', 'hay'), 1);
assert.deepEqual(lvs('kitty', 'kitten'), 2);
assert.deepEqual(lvs('hello', 'hi'), 4);
assert.deepEqual(lvs('actually', 'factual'), 3);
