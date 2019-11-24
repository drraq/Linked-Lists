const Matrix = require('./Matrix.js');
var A = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
// console.log(Array.isArray(A));
var m = new Matrix(A);
// m.insertRow([1,2,3,0]);
// m.insertRow([4,5,6,0]);
// m.insertRow([7,8,9,0]);
// m.insertRow([7,8,9,0]);

let d = m.getDiag();
console.log(d);
// console.log("Top Left", m.topLeft);
// console.log("Top Right", m.topRight);
// console.log("Bottom Left", m.bottomRight);
// console.log("Bottom Left", m.bottomLeft);
// console.log(m.insertRow([4,5,6,7]));
// m.displayCol(2);

// console.log("Top Left", m.topLeft);
