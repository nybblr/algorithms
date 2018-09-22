const assert = require('assert');

// Dynamic programming utility
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

let order = (tasks, start) => {
  let ordered = new Set();
  let explore = memoize(n => n, root => {
    tasks[root].forEach(task => explore(task));
    ordered.add(root);
  });
  explore(start);
  ordered.add(start);
  return [...ordered];
};

let tasks = {
  'chores': ['mop', 'interview', 'sweep'],
  'mop': ['sweep', 'dinner'],
  'interview': ['algfriyay', 'dinner'],
  'sweep': [],
  'algfriyay': [],
  'dinner': [],
};

assert.deepEqual(
  order(tasks, 'chores'), [
    'sweep',
    'dinner',
    'mop',
    'algfriyay',
    'interview',
    'chores',
  ]
);
