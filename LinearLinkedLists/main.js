const LinkedList = require('./LinkedList.js');

var ll = new LinkedList();
ll.push('Rehan');
ll.push('Abdul');
ll.push('Qadir');
ll.push('Mateen');
ll.push(200);
ll.push({
  fName: "Rehan",
  lName: "Qadir",
  age: 29
});

var data = ll.getData();
console.log(data);

// console.log(ll.size);
