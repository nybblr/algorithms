//       1
//     1   1
//   1   2   1
// 1   3   3   1
//   4   6   4
//     10  10
//      *20*

// Pascal's triangle
// Derive a diagonal at a time
let countPaths = (size) => {
  let prevDiagonal = [1];

  for (let i = 0; i < 2*size; i++) {
    let nextDiagonal = [];

    for (let j = 0; j < prevDiagonal.length + 1; j++) {
      let sum = (prevDiagonal[j-1] || 0)
              + (prevDiagonal[j]   || 0);
      nextDiagonal.push(sum);
    }

    prevDiagonal = nextDiagonal;
  }

  return prevDiagonal[size];
};
console.log(countPaths(5));

// Pascal's triangle
// Recursive solution, e.g. "Dynamic programming"
let countPaths = (width, height) => {
  if (width === 0 || height === 0) {
    return 1;
  }
  return countPaths(width, height - 1)
       + countPaths(width - 1, height);
};

// Teeny tiny ES2015 version
let countPaths = (w, h) =>
  !(w && h) ? 1 :
    countPaths(w, h - 1) +
    countPaths(w - 1, h);

console.log(countPaths(5, 5));
