const Matrix = require('./Matrix.js');
// var A =[1,2,3];
let B = [
  [0, 0, 3],
  [-1, 5, 5]
];

let A = [
  [1, 1, -1],
  [0, 1, 1]
];


var m = new Matrix(B);
var n = new Matrix(A);
n.display();
console.log();
m.display();
console.log();
n.subtract(m);
n.display();
// console.log(m.isSquare());
// let result = m.search(5);
// console.log(result);
// console.log(Array.isArray(A));
// var m = new Matrix(A);
// m.insertRow([1,2,3,0]);
// m.insertRow([4,5,6,0]);
// m.insertRow([7,8,9,0]);
// m.insertRow([7,8,9,0]);

// let d = m.getDiag();
// console.log(m);
// console.log(A[0].constructor === Array);
// console.log("Top Left", m.topLeft);
// console.log("Top Right", m.topRight);
// console.log("Bottom Left", m.bottomRight);
// console.log("Bottom Left", m.bottomLeft);
// console.log(m.insertRow([4,5,6,7]));
// m.displayCol(2);

// console.log("Top Left", m.topLeft);
