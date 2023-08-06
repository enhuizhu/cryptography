// zig-zag
export class RailFenceCipher {
  private UP = "UP";
  private DOWN = "DOWN";
  private depth = 2;

  constructor(depth?: number) {
    if (depth) {
      this.depth = depth;
    }
  }

  setDepth(depth: number) {
    this.depth = depth;
  }

  getMatrix(text: string) {
    const matrix = new Array(this.depth);

    let rowIndex = 0;
    let currentDirection = this.DOWN;

    for (const letter of text) {
      if (!matrix[rowIndex]) {
        matrix[rowIndex] = [];
      }

      matrix[rowIndex].push(letter);

      if (currentDirection === this.DOWN) {
        rowIndex += 1;
      } else {
        rowIndex -= 1;
      }

      if (rowIndex >= this.depth - 1) {
        currentDirection = this.UP;
      } else if (rowIndex <= 0) {
        currentDirection = this.DOWN;
      }
    }

    return matrix;
  }

  encrypt(originalText: string) {
    const text = originalText.replace(/\s/g, "");
    const matrix = this.getMatrix(text);

    let result = "";

    for (const row of matrix) {
      result = `${result}${row.join("")}`;
    }

    return result.toUpperCase();
  }

  isEmptyMatrix(matrix: string[][]) {
    for (const row of matrix) {
      if (row.length) {
        return false;
      }
    }

    return true;
  }

  decrypt(cipherText: string) {
    const matrix = this.getMatrix(cipherText);

    const originalMatrix = [];
    let startIndex = 0;

    for (const row of matrix) {
      originalMatrix.push(cipherText.substr(startIndex, row.length).split(""));
      startIndex += row.length;
    }

    let result = "";
    let currentRowIndex = 0;
    let currentDirection = this.DOWN;

    while (!this.isEmptyMatrix(originalMatrix)) {
      if (originalMatrix[currentRowIndex].length) {
        result += originalMatrix[currentRowIndex].shift();
      }

      if (currentDirection === this.DOWN) {
        currentRowIndex++;
      } else {
        currentRowIndex--;
      }

      if (currentRowIndex >= this.depth - 1) {
        currentDirection = this.UP;
      }

      if (currentRowIndex <= 0) {
        currentDirection = this.DOWN;
      }
    }

    return result;
  }
}
