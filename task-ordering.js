let tasks = {
  'chores': ['mop', 'interview', 'sweep'],
  'mop': ['sweep', 'dinner'],
  'interview': ['algfriyay', 'dinner'],
  'sweep': [],
  'algfriyay': [],
  'dinner': [],
};

// Imperative solution
let order = (tasks) => {
  let done = new Set();
  let taskNames = Object.keys(tasks);
  let taskCount = taskNames.length;

  for (let i = 0; i < taskCount; i++) {
    let taskToDo = taskNames.find(task =>
      tasks[task].every(subtask =>
        done.has(subtask)
      )
    );
    done.add(taskToDo);
    taskNames = taskNames.filter(task => task !== taskToDo);
  }

  return done;
};

// Recursive solution, unoptimized
let order = (tasks, start) => {
  let done = new Set();
  let doer = task => {
    tasks[task].forEach(subtask => doer(subtask));
    done.add(task);
  };
  doer(start);
  return [...done];
};

// Recursive solution, optimized
// A.K.A. "Dynamic programming"
let order = (tasks, start) => {
  let done = new Set();
  let doer = memoize(t => t, task => {
    tasks[task].forEach(subtask => doer(subtask));
    done.add(task);
  });
  doer(start);
  return [...done];
};

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

// Tests
const assert = require('assert');
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
