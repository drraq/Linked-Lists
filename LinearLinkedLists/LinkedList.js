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
        return undefined;
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
    // Edge case when there is no node in the list
    if (!this.head) {
      return;
    } else if (this.size === 1) {
      // Edge case when there is only one node at the head
      var current = this.head;
      this.head = null;
      this.size--;
      return current;
    } else {
      var current = this.head;
      var previous = null;
      while (current.next) {
        previous = current;
        current = current.next;
      }
      previous.next = null;
      this.size--;
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

  // Insert node at index starting from 0
  insertAt(index, data) {
    if (index > this.size - 1 || index < 0) {
      return null;
    }
    var current = this.head;
    var node = new Node(data);

    // Edge case for a new head
    if (index === 0) {
      this.head = node;
      this.head.next = current;
      this.size++;
    }

    var count = 1;
    while(current) {
      if (count === index) {
        node.next = current.next;
        current.next = node;
        this.size++;
      }
      ++count;
      current = current.next;
    }
  }

  // Remove node at index
  removeAt(index) {
    if (index > this.size - 1 || index < 0) {
      return null;
    }
    var current = this.head;
    if (index === 0) {
      this.head = current.next;
      current.next = null;
      this.size--;
    }

    var count = 1;
    while(current) {
      if (count === index) {
        var node = current.next;
        current.next = node.next;
        node.next = null;
        this.size--;
      }
      ++count;
      current = current.next;
    }
  }

  //reverse the linked list
  reverse() {
    var current = this.head;

    var reverseIt = node => {
      if (!node.next) {
        this.head = node;
        return;
      }
      reverseIt(node.next);
      var temp = node.next;
      temp.next = node;
      node.next = null;
    }
    reverseIt(current);
  }
  concat(list) {
    // Edge case when the list is empty
    if (!this.head) {
      return undefined;
    } else {
      var current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = list.getHead();
      this.size += list.getSize();
      return this;
    }
  }

  forEach(callback) {
    var current = this.head;
    var index = -1;
    while(current) {
      index++;
      var next = current.next;
      callback(index, current, next);
      current = current.next;
    }
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

  // Returns head of the list
  getHead() {
    return this.head;
  }

  // Returns data in reverse order.
  // Implementation using recursion

  getDataInReverse() {
    var data = [];
    var current = this.head;

    var recursivePrint = node => {
      if (!node) return;
      recursivePrint(node.next);
      data.push(node.data);
    }
    recursivePrint(current);
    return data;
  }
}

module.exports = LinkedList;
