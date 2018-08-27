// Immutable, imperative, recursive
var flatten = function (array) {
  var flattened;
  if (Array.isArray(array)) {
    flattened = [];
    array.forEach(function(ele) {
      flattened = flattened
        .concat(flatten(ele));
    });
  } else {
    flattened = [array];
  }
  return flattened;
};

// Immutable, functional, recursive
var flatten = function (array) {
  return Array.isArray(array) ?
    array.reduce(function(list, ele) {
      return list.concat(flatten(ele));
    }, [])
  :
    [array];
};

// ES2015 version
let flatten = array =>
  Array.isArray(array) ?
    array.reduce((list, ele) =>
      [...list, ...flatten(ele)], [])
  : [array]

let array = [1,2,[3,[4,5,6,[7]]]];

console.log(
  flatten(array)
);
