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
        if (data[0].constructor === Array) {
          for (let i = 0; i < data.length; i++) {
            this.insertRow(data[i]);
          }
        } else {
          this.insertRow(data);
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

          let prev = this.topRight;
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

        let above = this.bottomRight = this.bottomLeft;

        for (let j = 0; j < this.cols; j++) {
          let node = new Node(data[j]);

          if (above.prev) {
            let current = this.bottomRight;
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
  // Top Left to Bottom Right
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

  /* The following functions perform Matrix Airthmetic
   * Multiplication by a scalar
   * Adding two Matrices of the same order
   */

  // Multiply a given matrix by a scalar
  multiplyByScalar(scalar) {
    if (!scalar && scalar !== 0) return undefined;
    let node = this.topLeft;

    while (node) {
      let current = node;
      while (current) {
        current.data *= scalar;
        current = current.next;
      }
    node = node.down;
    }
    return this;
  }

  // Add two matrices and store the result in a new matrix
  add(m) {
    let order = m.getSize();
    if (order.r !== this.rows || order.c !== this.cols) return undefined;

    let node = this.topLeft;
    let mNode = m.getTopLeft();
    let data = [];

    while(node) {
      let result = 0;
      let record = [];
      let current = node;
      let mCurrent = mNode;
      while(current) {
        result = current.data + mCurrent.data;
        record.push(result);
        current = current.next;
        mCurrent = mCurrent.next;
      }
      node = node.down;
      mNode = mNode.down;
      data.push(record);
    }
    return new Matrix(data);
  }

  // Subtract two matrices and return a new matrix
  subtract(m) {
    let order = m.getSize();
    if (order.r !== this.rows || order.c !== this.cols) return undefined;

    let node = this.topLeft;
    let mNode = m.getTopLeft();
    let data = [];

    while(node) {
      let result = 0;
      let record = [];
      let current = node;
      let mCurrent = mNode;
      while(current) {
        result = current.data - mCurrent.data;
        record.push(result);
        current = current.next;
        mCurrent = mCurrent.next;
      }
      node = node.down;
      mNode = mNode.down;
      data.push(record);
    }
    return new Matrix(data);
  }

  // Multiply two Matrices
  multiply(m) {
    let order = m.getSize();
    if (this.cols !== order.r) return undefined;

    let node = this.topLeft;
    let mNode = m.getTopLeft();
    let data = [];

    while (node) {
      let current = node;
      let record = [];
      while (mNode) {
        let mCurrent = mNode;
        let result = 0;
        while(mCurrent) {
          result += (current.data * mCurrent.data);
          current = current.next;
          mCurrent = mCurrent.down;
        }
        record.push(result);
        mNode = mNode.next;
        current = node;
      }
      data.push(record);
      node = node.down;
      mNode = m.getTopLeft();
    }

    return new Matrix(data);
  }

  // Search an entry in the matrix, returns an object
  search(value) {
    if (!value && value !== 0) return undefined;
    let result = {
      value: value,
      r: [],
      c: [],
      frequency: 0
    };
    let node = this.topLeft;
    let i = 1, j = 1;
    while(node) {
      let current = node;
      while(current) {
        if (current.data === value) {
          result.r.push(i);
          result.c.push(j);
          result.frequency++;
        }
        current = current.next;
        j++;
      }
      node = node.down;
      i++;
      j = 1;
    }
    return result;
  }

  // Get size of the matrix
  getSize() {
    return {r: this.rows, c: this.cols};
  }

  // Get the top Left Node of the matrix
  getTopLeft() {
    return this.topLeft;
  }

  // Check for Square matrix
  isSquare() {
    return this.rows === this.cols ? true : false;
  }
}

module.exports = Matrix;
