const { CipherCore } = require('../../lib/CipherCore');

class DESCipher extends CipherCore {
  constructor(keyString, encryptFunc) {
    super();

    if (!this.keyCheck(keyString)) {
      throw new Error("invalid key");
    }

    this.encryptFunc = encryptFunc;
    this.keyString = this.generateSubKey(keyString);
    /**
     * why we need initial permutation
     * and is the value of permutation table fixed
     */
    this.initialPermutationTable = [
      [58, 50, 42, 34, 26, 18, 10, 2],
      [60, 52, 44, 36, 28, 20, 12, 4],
      [62, 54, 46, 38, 30, 22, 14, 6],
      [64, 56, 48, 40, 32, 24, 16, 8],
      [57, 49, 41, 33, 25, 17, 9, 1],
      [59, 51, 43, 35, 27, 19, 11, 3],
      [61, 53, 45, 37, 29, 21, 13, 5],
      [63, 55, 47, 39, 31, 23, 15, 7],
    ];

    this.invertInitialPermutationTable = [
      [40, 8, 48, 16, 56, 24, 64, 32],
      [39, 7, 47, 15, 55, 23, 63, 31],
      [38, 6, 46, 14, 54, 22, 62, 30],
      [37, 5, 45, 13, 53, 21, 61, 29],
      [36, 4, 44, 12, 52, 20, 60, 28],
      [35, 3, 43, 11, 51, 19, 59, 27],
      [34, 2, 42, 10, 50, 18, 58, 26],
      [33, 1, 41, 9, 49, 17, 57, 25],
    ];

    /**
     * substitution consists of a set of 8 s-boxes, each of which accept 6 bits as input and
     * produces 4 bits as output, these transformation are defined as follows:
     * 1. the first bit and last bits of the input to the box Si form a 2-bit binary
     * number to select 1 of 4 substitutions defined by four rows in the table Si
     * 2. the middle 4 bits select on of the 16 columns
     * 3. the decimal value in the cell selected by the row and column is then converted
     * to it's 4 bit representation to produce the output
     */

    this.sBoxes = [
      [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
        [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
      ],
      [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
        [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
      ],
      [
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
      ],
      [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
      ],
      [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
      ],
      [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
      ],
      [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
      ],
      [
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
      ],
    ];

    /**
     * the key is first subjected to a permutation governed by table
     * permuted choice one
     * the resulting 56 bit key it then treated as 28 bit quantities of
     * C0 and D0
     */
    this.permutedChoiceOne = [
      [57, 49, 41, 33, 25, 17, 9],
      [1, 58, 50, 42, 34, 26, 18],
      [10, 2, 59, 51, 43, 35, 27],
      [19, 11, 3, 60, 52, 44, 36],
      [63, 55, 47, 39, 31, 23, 15],
      [7, 62, 54, 46, 38, 30, 22],
      [14, 6, 61, 53, 45, 37, 29],
      [21, 13, 5, 28, 20, 12, 4],
    ];

    /**
     * At each round , Ci-1 and Di - 1 are separately subjected
     * to a circular left shift of 1 or 2 bits
     */
    this.bitRotatedTable = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

    /**
     * these shifted values serve as input to
     * the next round, and permuted choice two which produce
     * a 48 bit output that serves as input to function F(Ri-1, Ki)
     * Permuted Choice 2 "PC-2" Ignored bits 9, 18, 22, 25, 35, 38, 43, 54.
     */
    this.permutedChoiceTwo = [
      [14, 17, 11, 24, 1, 5, 3, 28],
      [15, 6, 21, 10, 23, 19, 12, 4],
      [26, 8, 16, 7, 27, 20, 13, 2],
      [41, 52, 31, 37, 47, 55, 30, 40],
      [51, 45, 33, 48, 44, 49, 39, 56],
      [34, 53, 46, 42, 50, 36, 29, 32],
    ];

    /**
     * permutation used after sbox
     */
    this.permutationTable = [
      [16, 7, 20, 21, 29, 12, 28, 17],
      [1, 15, 23, 26, 5, 18, 31, 10],
      [2, 8, 24, 14, 32, 27, 3, 9],
      [19, 13, 30, 6, 22, 11, 4, 25],
    ];
  }

  /**
   * divide 64 bit into 8 bytes
   *  sum of each byte must be odd
   */
  keyCheck(sixtyFourBit) {
    if (sixtyFourBit.length !== 64) {
      throw new Error("input must be 64 bit");
    }

    const chunkLength = 8;
    let currentIndex = 0;

    while (currentIndex < sixtyFourBit.length) {
      const eightBit = sixtyFourBit.substr(currentIndex, chunkLength);

      const sum = eightBit.split("").reduce((acc, current) => {
        acc += Number(current);
        return acc;
      }, 0);

      // it's even
      if (sum % 2 === 0) {
        return false;
      }

      currentIndex += chunkLength;
    }

    return true;
  }
  /**
   *
   * every eighth bit is ignored
   */
  generateSubKey(sixtyFourBit) {
    const chunkLength = 8;
    const neededChunkLength = 7;
    let currentIndex = 0;
    let result = "";

    while (currentIndex < sixtyFourBit.length) {
      const eightBit = sixtyFourBit.substr(currentIndex, chunkLength);
      const sevenBit = eightBit.substr(0, neededChunkLength);
      result += sevenBit;
      currentIndex += chunkLength;
    }

    return result;
  }

  reduceKeySizeFrom56To48(fiftySixBit) {
    // Permuted Choice 2 "PC-2" Ignored bits 9, 18, 22, 25, 35, 38, 43, 54.
    const ignoredBitPos = [8, 17, 21, 24, 34, 37, 42, 53];
    let result = this.getNewBitTextBaseOnPosTable(
      fiftySixBit,
      this.permutedChoiceTwo,
      56,
      ignoredBitPos
    );

    return result.flat().join("");
  }

  sixBitToFourBit(sixBit, sBox) {
    // console.log('sbox', sBox);
    if (sixBit.length !== 6) {
      throw new Error("the input must be 6 bit");
    }

    const row = `${sixBit[0]}${sixBit[5]}`;
    const rowNumber = parseInt(row, 2);

    const col = sixBit.substr(1, 4);
    const colNumber = parseInt(col, 2);

    const correspondNumber = sBox[rowNumber][colNumber];

    if (correspondNumber === undefined) {
      console.log({
        rowNumber,
        colNumber,
        sBox,
      });

      throw Error("can not find number in sbox");
    }

    let numberResult = correspondNumber.toString(2);
    let result = numberResult;

    if (result.length < 4) {
      for (let i = 0; i < 4 - numberResult.length; i++) {
        result = `0${result}`;
      }
    }

    return result;
  }

  fourtyeightBitToThirtytwoBit(fourtyeightBit) {
    if (fourtyeightBit.length !== 48) {
      throw new Error("the input must be 48 bit");
    }

    const chunkLength = 6;
    let currentIndex = 0;
    let currentRound = 0;
    let result = "";

    while (currentIndex < fourtyeightBit.length) {
      const sBox = this.sBoxes[currentRound];
      result += this.sixBitToFourBit(
        fourtyeightBit.substr(currentIndex, chunkLength),
        sBox
      );
      currentIndex += chunkLength;
      currentRound++;
    }

    return result;
  }

  permute32Bit(thritytwoBit) {
    const result = this.getNewBitTextBaseOnPosTable(
      thritytwoBit,
      this.permutationTable,
      32
    );

    return result.flat().join('');
  }

  findPosBaseOnIndex(pos, eightTimeEightTable) {
    for (let row = 0; row < eightTimeEightTable.length; row++) {
      for (let col = 0; col < eightTimeEightTable[row].length; col++) {
        if (eightTimeEightTable[row][col] == pos) {
          return {
            row,
            col,
          };
        }
      }
    }

    throw new Error(`can not find ${pos} in the table`);
  }

  /**
   * the first phase of DES involves an Initial Permutation(IP)
   * which arranges the input to produce the permuted input. The
   * final phase applies Inverse Initial Permutation(IP^-1) to the
   * preoutput, producing the final cipher text
   * IP and IP^-1 can be defined by tables as follows
   * 1. The input to each table consists of 64 bits numbered from 1 to 64
   * 2. The 64 entries in permutation table contains permutation of the number 1 - 64
   * 3. Each entry in the permutation indicates the position of a numbered input bit
   * in the output, which also consists of 64 bits
   * 4. As it's quite a regular structure, it's easy to implement in hardware.
   */
  initialPermutation(sixtyFourBit) {
    return this.getNewBitTextBaseOnPosTable(
      sixtyFourBit,
      this.initialPermutationTable
    );
  }

  divideBitsIntoTwoGroups(bitString, groupSize) {
    const left = bitString.substr(0, groupSize);
    const right = bitString.substr(groupSize);

    return [left, right];
  }

  expansionAndPermutationTo48bit(thritytwoBit) {
    if (thritytwoBit.length !== 32) {
      console.log({
        thritytwoBit,
        length: thritytwoBit.length,
      })
      throw new Error("the length of input must be 32");
    }

    const chunkLength = 4;
    let currentIndex = 0;

    let result = ``;

    while (currentIndex < thritytwoBit.length) {
      let newBits = thritytwoBit.substr(currentIndex, chunkLength + 1);

      if (currentIndex === 0) {
        newBits = `${thritytwoBit[thritytwoBit.length - 1]}${newBits}`;
      } else {
        newBits = `${thritytwoBit[currentIndex - 1]}${newBits}`;
      }

      if (newBits.length < 6) {
        newBits += thritytwoBit[0];
      }

      result += newBits;

      currentIndex += chunkLength;
    }

    return result;
  }

  getKeyByRound(roundIndex, currentKey) {
    const [leftKey, rightKey] = this.divideBitsIntoTwoGroups(currentKey, 28);
    const shiftDistance = this.bitRotatedTable[roundIndex];

    const newLeftKey = this.leftShift(leftKey, shiftDistance);
    const newRightKey = this.leftShift(rightKey, shiftDistance);

    return `${newLeftKey}${newRightKey}`;
  }

  leftShift(bitString, distance) {
    const length = bitString.length;
    const bitArray = bitString.split("");

    const steps = distance % length;

    const result = [];

    for (let i = 0; i < length; i++) {
      let newPos = i - steps;

      if (newPos < 0) {
        newPos += length;
      }

      result[newPos] = bitArray[i];
    }

    return result.join("");
  }

  encrypt(sixtyFourBit) {
    const textAfterInitialPermutation = this.initialPermutation(sixtyFourBit).flat().join('');
    let currentRound = 0;
    let currentKeyString = this.keyString;
    let current48BitKey;

    const [leftTextBit, rightTextBit] = this.divideBitsIntoTwoGroups(
      textAfterInitialPermutation,
      32
    );

    let leftResult = leftTextBit;
    let rightResult = rightTextBit;

    while (currentRound < this.bitRotatedTable.length) {
      currentKeyString = this.getKeyByRound(currentRound, currentKeyString);
      current48BitKey = this.reduceKeySizeFrom56To48(currentKeyString);
      const expandedRightText =
        this.expansionAndPermutationTo48bit(rightResult);
      const encryptResult = this.encryptFunc(expandedRightText);
      const xorResult = this.bitsXor(encryptResult, current48BitKey);
      
      const sboxResult = this.fourtyeightBitToThirtytwoBit(xorResult);
      const permutationResult = this.permute32Bit(sboxResult);
      const temp = this.bitsXor(leftResult, permutationResult);

      leftResult = rightResult;
      rightResult = temp;
      currentRound++;
    }

    return this.inverseInitialPermutation(`${rightResult}${leftResult}`).flat().join('');
  }

  getNewBitTextBaseOnPosTable(
    bitSting,
    posTable,
    bitStringLength = 64,
    ignoredBits = []
  ) {
    if (bitSting.length !== bitStringLength) {
      throw new Error(`input must be ${bitStringLength} bit`);
    }

    const result = [];

    for (let i = 0; i < bitSting.length; i++) {
      if (ignoredBits.includes(i)) {
        continue;
      }

      const { row, col } = this.findPosBaseOnIndex(i + 1, posTable);

      if (!result[row]) {
        result[row] = [];
      }

      result[row][col] = bitSting[i];
    }

    return result;
  }

  generateBitData(bitLength) {
    let result = "";

    for (let i = 0; i < bitLength; i++) {
      const bitValue = Math.round(Math.random());
      result = `${result}${bitValue}`;
    }

    return result;
  }

  inverseInitialPermutation(sixtyFourBit) {
    return this.getNewBitTextBaseOnPosTable(
      sixtyFourBit,
      this.invertInitialPermutationTable
    );
  }
}

const keyString = `0001001100110100010101110111100110011011101111001101111111110001`;
const dESCipher = new DESCipher(keyString, (input) => {
  return input;
});

console.assert(
  dESCipher.leftShift("12345678", 1) === "23456781",
  "dESCipher.leftShift('12345678', 1) === '23456781' fail"
);
console.assert(
  dESCipher.leftShift("12345678", 2) === "34567812",
  "dESCipher.leftShift('12345678', 2) === '34567812' fail"
);

const bitText = dESCipher.generateBitData(56);
const testBitText = dESCipher.generateBitData(64);

const cipher = dESCipher.encrypt(testBitText);

console.log({
  testBitText,
  cipher
})

console.log('128bit', dESCipher.generateBitData(128));

console.assert(
  dESCipher.reduceKeySizeFrom56To48(bitText).length === 48,
  "dESCipher.reduceKeySizeFrom56To48(bitText).length === 48 fail"
);

const thritytwoBit = dESCipher.generateBitData(32);
const expansion = dESCipher.expansionAndPermutationTo48bit(thritytwoBit);

console.assert(expansion.length === 48, "expansion.length === 48 fail");
console.assert(dESCipher.permute32Bit(thritytwoBit).length === 32, "dESCipher.permute32Bit(thritytwoBit).length === 32 fail");

console.assert(dESCipher.bitsXor('111', '111') === '000');
console.assert(dESCipher.bitsXor('011', '111') === '100');
console.assert(dESCipher.bitsXor('011', '101') === '110');



// const result = dESCipher.fourtyeightBitToThirtytwoBit(bitText);
// console.assert(dESCipher.keyCheck(keyString) === true);
// const keyString2 = `1001001100110100010101110111100110011011101111001101111111110001`;
// console.assert(
//   dESCipher.keyCheck(keyString2) === false,
//   "dESCipher.keyCheck(keyString2) === false fail"
// );
// const subKey = dESCipher.generateSubKey(keyString);
// console.log({ subKey });

// console.log({
//   bitText,
//   length: bitText.length,
//   result,
//   resultLength: result.length
// });

// console.log("48 to 32", dESCipher.fourtyeightBitToThirtytwoBit(bitText));

// console.log(dESCipher.sixBitToFourBit('110011', dESCipher.s1box));
