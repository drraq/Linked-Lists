const Node = require("./Node.js");

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Push Node to the end of the Linked List (LL)
  push(data) {
    // Edge case for the first Node
    if (!this.head) {
      this.head = new Node(data);
      this.size++;
    } else {
      var current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new Node(data);
      this.size++;
    }
  }

  pop() {
    // Pop last node in LL
    if (!this.head) {
      return;
    } else {
      var current = this.head;
      var previous = null;
      while (current.next) {
        previous = current;
        current = current.next;
      }
      previous.next = null;
      return current;
    }
  }

  getSize() {
    // Returns size of LL
    return this.size;
  }

  getData() {
    // Returns data in array of all nodes in LL
    var data = []
    var current = this.head;
    while(current) {
      data.push(current.data);
      current = current.next;
    }
    return data;
  }
}

module.exports = LinkedList;
