const LinkedList = require('./LinkedList.js');
let data = [1,2,3,4,5,6];
var ll = new LinkedList(data);
// let d = ll.getData();

// console.log(d);
var n = ll.search(4);

console.log(n);
