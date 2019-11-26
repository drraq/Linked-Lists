class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  push(data) {
    var node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      var last = this.tail;
      this.tail = node;
      this.tail.prev = last;
      last.next = this.tail;
    }
    this.size++;

    return this;
  }
}

module.exports = DoublyLinkedList;
