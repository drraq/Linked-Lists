const LinkedList = require('./LinkedList.js');
// let data = { a: 0, b: 1};
let data = [1,2,3,4,5];
var ll = new LinkedList(data);

ll.push(6);
// var fg = ll;
for (let node of ll) {
  console.log(node);
}
