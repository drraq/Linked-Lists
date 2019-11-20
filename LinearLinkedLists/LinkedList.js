const Node = require("./Node.js");

class LinkedList {
  constructor(data = null) {
    if (data) {
      this.head = null;
      this.size = 0;
      if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          this.push(data[i]);
        }
      } else {
        console.log("Array data type expected.\nEmpty linked list is created.");
      }
    } else {
      this.head = null;
      this.size = 0;
    }
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
    return this;
  }

  // Pop last node in LL
  pop() {
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

  // Add new head to the list
  unshift(data) {
    if (!this.head) {
      this.push(data);
    } else {
      var currentHead = this.head;
      var node = new Node(data);
      node.next = currentHead;
      this.head = node;
    }
    return this;
  }

  //Search for a certain node with a given data
  search(data) {
    var current = this.head;
    while(current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  // Returns size of LL
  getSize() {
    return this.size;
  }

  // Returns data in array of all nodes in LL
  getData() {
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
