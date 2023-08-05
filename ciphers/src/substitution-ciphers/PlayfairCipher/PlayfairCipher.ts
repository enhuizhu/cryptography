import { CipherCore } from "../../lib/CipherCore";

export class PlayfairCipher extends CipherCore {
  constructor() {
    super();
  }

  deleteDuplicateLetter(text: string) {
    let result = "";

    for (const letter of text) {
      if (!result.includes(letter)) {
        result = result.concat(letter);
      }
    }

    return result;
  }

  deleteKeyLetterFromArray(key: string, letterList: string[]) {
    const newArray = [];

    for (const letter of letterList) {
      if (!key.includes(letter)) {
        newArray.push(letter);
      }
    }

    return newArray;
  }

  splitMessageIntoPair(msg: string) {
    const pairs: string[][] = [];

    let pairsIndex = 0;

    for (let i = 0; i < msg.length; i++) {
      // delete all the space
      if (msg[i] === " ") {
        continue;
      }

      const letter: string = msg[i];

      if (!pairs[pairsIndex]) {
        pairs[pairsIndex] = [];
      }

      if (pairs[pairsIndex].length < 2) {
        pairs[pairsIndex].push(letter.toUpperCase());
      }

      if (pairs[pairsIndex].length === 1) {
        // if next letter is duplicated letter or it is the last letter, then insert "x"
        if (msg[i + 1] === letter || i === msg.length - 1) {
          pairs[pairsIndex].push("X");
        }
      }

      if (pairs[pairsIndex].length >= 2) {
        pairsIndex += 1;
      }
    }

    return pairs;
  }

  isPairOnSameRow(pair: string[], matrix: string[][]) {
    for (let row = 0; row < matrix.length; row++) {
      const letters = matrix[row];

      if (letters.includes(pair[0]) && letters.includes(pair[1])) {
        return true;
      }
    }

    return false;
  }

  isPairOnSameCol(pair: string[], matrix: string[][]) {
    for (let col = 0; col < matrix[0].length; col++) {
      const letters = matrix.map((row) => row[col]);

      if (letters.includes(pair[0]) && letters.includes(pair[1])) {
        return true;
      }
    }

    return false;
  }

  getLetterPosition(letter: string, matrix: string[][]) {
    let pos: number[] = [];

    for (let row = 0; row < matrix.length; row++) {
      const xPos = matrix[row].indexOf(letter);

      if (xPos !== -1) {
        pos = [xPos, row];
        return pos;
      }
    }

    return pos;
  }

  getMirrorLetters(pair: string[], matrix: string[][]) {
    const positions = [
      this.getLetterPosition(pair[0], matrix),
      this.getLetterPosition(pair[1], matrix),
    ];

    const mirrorPos = [
      [positions[1][0], positions[0][1]],
      [positions[0][0], positions[1][1]],
    ];

    return [
      matrix[mirrorPos[0][1]][mirrorPos[0][0]],
      matrix[mirrorPos[1][1]][mirrorPos[1][0]],
    ];
  }

  getNextLetter(letter: string, row: string[]) {
    const pos = row.indexOf(letter);
    let newPos = pos + 1;

    if (row[newPos]) {
      return row[newPos];
    }

    return row[0];
  }

  getPreLetter(letter: string, row: string[]) {
    const pos = row.indexOf(letter);
    let newPos = pos - 1;

    if (row[newPos]) {
      return row[newPos];
    }

    return row[row.length - 1];
  }

  getNextPair(pair: string[], row: string[]) {
    const newPair = [];

    for (const letter of pair) {
      newPair.push(this.getNextLetter(letter, row));
    }

    return newPair;
  }

  getPrePair(pair: string[], row: string[]) {
    const newPair = [];

    for (const letter of pair) {
      newPair.push(this.getPreLetter(letter, row));
    }

    return newPair;
  }

  getRow(letter: string, matrix: string[][]) {
    for (const row of matrix) {
      if (row.includes(letter)) {
        return row;
      }
    }

    return [];
  }

  getColIndex(letter: string, matrix: string[][]) {
    for (let row = 0; row < matrix.length; row++) {
      const pos = matrix[row].indexOf(letter);

      if (pos !== -1) {
        return pos;
      }
    }

    return -1;
  }

  generateMatrix(key: string) {
    const cleanedKey = this.deleteDuplicateLetter(key);
    const remainLetters = this.deleteKeyLetterFromArray(cleanedKey, [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ]);
    const newLetters = [...cleanedKey.split(""), ...remainLetters];
    const matrix: string[][] = [];
    const rows = 5;
    const cols = 5;

    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        matrix[i].push(newLetters[i * rows + j]);
      }
    }

    return matrix;
  }

  encrypt(msg: string, key: string) {
    const newMsg = msg.toUpperCase().replace(/J/g, "I");
    const matrix = this.generateMatrix(this.deleteDuplicateLetter(key));
    const msgPairs = this.splitMessageIntoPair(newMsg);

    let newPairs = [];

    for (const pair of msgPairs) {
      if (this.isPairOnSameRow(pair, matrix)) {
        const row = this.getRow(pair[0], matrix);
        newPairs.push(this.getNextPair(pair, row));
      } else if (this.isPairOnSameCol(pair, matrix)) {
        const colIndex = this.getColIndex(pair[0], matrix);
        const arr = matrix.map((row) => row[colIndex]);
        newPairs.push(this.getNextPair(pair, arr));
      } else {
        newPairs.push(this.getMirrorLetters(pair, matrix));
      }
    }

    return newPairs.flat().join("");
  }

  decrypt(msg: string, key: string) {
    const newMsg = msg.toUpperCase().replace(/J/g, "I");
    const matrix = this.generateMatrix(this.deleteDuplicateLetter(key));
    const msgPairs = this.splitMessageIntoPair(newMsg);

    let newPairs = [];

    for (const pair of msgPairs) {
      if (this.isPairOnSameRow(pair, matrix)) {
        const row = this.getRow(pair[0], matrix);
        newPairs.push(this.getPrePair(pair, row));
      } else if (this.isPairOnSameCol(pair, matrix)) {
        const colIndex = this.getColIndex(pair[0], matrix);
        const arr = matrix.map((row) => row[colIndex]);
        newPairs.push(this.getPrePair(pair, arr));
      } else {
        newPairs.push(this.getMirrorLetters(pair, matrix));
      }
    }

    return newPairs.flat().join("");
  }
}
