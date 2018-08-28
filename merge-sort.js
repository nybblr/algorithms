let defaultCompare = (a, b) =>
  a > b ? 1 : (a < b ? -1 : 0);

let split = (array) => {
  let pivot = Math.floor(array.length / 2);
  return [
    array.slice(0, pivot),
    array.slice(pivot)
  ];
};

let merge = (left, right, compare) => {
  let array = [];
  let i = 0;
  let j = 0;
  while (i < left.length || j < right.length) {
    let a = left[i];
    let b = right[j];
    let pickLeft = j === right.length || compare(a, b) < 0;

    array.push(pickLeft ? ++i && a : ++j && b);
  }
  return array;
};

let sort = (array, compare = defaultCompare) => {
  if (array.length <= 1) {
    return array;
  }

  let [left, right] = split(array);

  return merge(
    sort(left, compare),
    sort(right, compare),
    compare
  );
};

const assert = require('assert');

assert.deepEqual(sort([]), []);
assert.deepEqual(sort([1]), [1]);
assert.deepEqual(sort([1,2,3]), [1,2,3]);
assert.deepEqual(sort([2,1,3]), [1,2,3]);
assert.deepEqual(sort([3,1,2]), [1,2,3]);
assert.deepEqual(sort([1,3,2]), [1,2,3]);
assert.deepEqual(sort([1,7,3,2]), [1,2,3,7]);

assert.deepEqual(sort(['d','a','c','b']), ['a','b','c','d']);
