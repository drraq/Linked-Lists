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
  constructor() {
    this.topLeft = this.topRight = this.bottomRight = this.bottomLeft =  null;
    this.rows = this.cols = 0;
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

  // Display a single column
  displayCol(col) {
    if ( col > this.cols || col < 1) return null;
    let node = this.topLeft;
    for (let i = 1; i < col; i++) node = node.next;
    while (node) {
      console.log(node.data);
      node = node.down;
    }
  }
}

module.exports = Matrix;
