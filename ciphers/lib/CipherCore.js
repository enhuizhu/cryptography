class CipherCore {
  constructor() {
    this.alphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
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
    ];
  }

  bitsXor(bits1, bits2) {
    if (bits1.length !== bits2.length) {
      throw new Error(`${bits1} must have same length as ${bits2}`);
    }

    let result = "";

    for (let i = 0; i < bits1.length; i++) {
      if (bits1[i] !== bits2[i]) {
        result += "1";
      } else {
        result += "0";
      }
    }

    return result;
  }

  getLetterPos(letter) {
    return this.alphabets.indexOf(letter.toUpperCase());
  }

  generateCorrespondKey(key, msg) {
    const restKeysLengthRequired = msg.length - key.length;
    const numberOfKey = Math.floor(restKeysLengthRequired / key.length);
    const remainKeyLength = restKeysLengthRequired % key.length;

    let finalKey = key;

    for (let i = 0; i < numberOfKey; i++) {
      finalKey = `${finalKey}${key}`;
    }

    if (remainKeyLength) {
      finalKey = `${finalKey}${key.substr(0, remainKeyLength)}`;
    }

    return finalKey;
  }
}

module.exports = { CipherCore };
