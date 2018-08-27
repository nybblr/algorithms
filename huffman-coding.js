// let message = 'kitty';
let message = 'mississippi';

let compare = (a, b) =>
  a > b ? 1 : (a < b ? -1 : 0);

let sorter = (a, b) =>
  -1 * compare(a[1], b[1]) ||
  compare(a[0], b[0]);

let swapKeysAndValues = dict => {
  let swapped = {};
  Object.entries(dict).forEach(
    ([key, value]) => swapped[value] = key
  );
  return swapped;
};

let frequency = message => {
  let histogram = {};
  for (let char of message) {
    histogram[char] = (histogram[char] || 0) + 1;
  }
  return histogram;
};

let orderKeysByValues = dict =>
  Object.entries(dict)
    .sort(sorter)
    .map(c => c[0]);

let huffman = histogram => {
  let chars = orderKeysByValues(histogram);
  let last = chars.pop();

  let map = {};
  let prev = '';
  chars.forEach(([char]) => {
    map[char] = prev + '1';
    prev += '0';
  });

  map[last] = prev;

  return map;
};

let mapFor = message => huffman(frequency(message))

let encode = (message, map) =>
  [...message].reduce(
    (memo, char) => memo + map[char]
  , '')

let decode = (encoded, map) => {
  map = swapKeysAndValues(map);
  let curr = '';
  let decoded = '';
  for (let char of encoded) {
    curr += char;
    if (map[curr]) {
      decoded += map[curr];
      curr = '';
    }
  }
  return decoded;
}

let map = mapFor(message);
let encoded = encode(message, map)
console.log(encoded);

let decoded = decode(encoded, map)
console.log(decoded);
