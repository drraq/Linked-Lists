const LinkedList = require('./LinkedList.js');
// let data = { a: 0, b: 1};
let data = [1,2,3,4,5];
var ll = new LinkedList(data);
var ll2 = new LinkedList([6,7,8]);

var ll3 = ll.concat(ll2);
var d = ll3.getData();
console.log(d);
