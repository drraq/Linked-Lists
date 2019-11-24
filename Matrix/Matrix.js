class Node {
  constructor(data, up = null, next = null, prev = null, down = null) {
    this.data = data;
    this.up = up;
    this.next = next;
    this.prev = prev;
    this.down = down;
  }
}

class Matrix {
  constructor(data=null) {
    this.topLeft = this.topRight = this.bottomRight = this.bottomLeft =  null;
    this.rows = this.cols = 0;
    if (data) {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          this.insertRow(data[i]);
        }
      } else {
        return null;
      }
    }
  }

  // Insert Row in the Matrix (sequentially row by row)
  // data should be an array of integers
  // It sets the cols value upon first function call.
  insertRow(data) {
    if (Array.isArray(data)) {
      // Edge case for first row insertion
      if (this.rows === 0 && this.cols === 0) {
        for (let j = 0; j < data.length; j++) {
          let node = new Node(data[j]);

          var prev = this.topRight;
          this.topRight = this.bottomRight = node;

          if (prev) {
            prev.next = this.topRight;
            this.topRight.prev = this.bottomRight.prev = prev;
          } else {
            this.topLeft = this.bottomLeft = node;
          }
        }
        this.rows++;
        this.cols = data.length;
        return this;
      } else {
        if (data.length !== this.cols) return null;

        var above = this.bottomRight = this.bottomLeft;

        for (let j = 0; j < this.cols; j++) {
          let node = new Node(data[j]);

          if (above.prev) {
            var current = this.bottomRight;
            this.bottomRight = node;
            node.up = above;
            node.prev = current;
            above.down = node;
            current.next = node;
          } else {
            this.bottomLeft = this.bottomRight = node;
            this.bottomLeft.up = this.bottomRight.up = above;
            above.down = node;
          }
          above = above.next;
        }
        this.rows++;
        return this;
      }
    }
  }

  // Print Matrix entries separated by tab character

  display() {
    let spaces = "\t";
    let current = this.topLeft;

    while (current) {
      let row = "";
      let node = current;
      while(node) {
        row += node.data + spaces;
        node = node.next;
      }
     console.log(row);
     current = current.down;
    }
  }

  // Get a single column
  getColumn(col) {
    let data = [];
    if ( col > this.cols || col < 1) return data;
    let node = this.topLeft;
    for (let i = 1; i < col; i++) node = node.next;
    while (node) {
      data.push(node.data);
      node = node.down;
    }
    return data;
  }

  // Get diagonal elements of a square matrix

  getDiag() {
    if (this.rows !== this.cols) return undefined;
    let data = [];
    let node = this.topLeft;

    while(node.next) {
      data.push(node.data);
      node = node.next;
      node = node.down;
    }
    data.push(node.data);
    return data;
  }
}

module.exports = Matrix;
