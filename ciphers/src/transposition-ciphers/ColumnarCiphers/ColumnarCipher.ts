/**
 * 1. put letters into different columns from left to right.
 * 2. read new letters from column to columns base on the order of keys
 * for example if key is 21, then read the last column first because
 * last column index is 1 and read the last second column second because
 * the index of last second column is 2. Once the order of column has been
 * decided, then we can read the letters from top to the bottom.
 */

export class ColumnarCipher {
  private key: string = "";

  constructor(key?: string) {
    if (key) {
      this.key = key;
    }
  }

  setKey(key: string) {
    this.key = key;
  }

  getKeyMap(initValue?: string[]) {
    const map: Record<string, string[]> = {};
    const keys = this.key.toString().split("");

    for (const item of keys) {
      map[item] = initValue === undefined ? [] : initValue;
    }

    return map;
  }

  getKeyLetterMap(text: string) {
    let keyIndex = 0;
    const keyString = this.key.toString();
    const keyMap = this.getKeyMap();

    for (const letter of text) {
      const currentMapKey = keyString[keyIndex];
      keyMap[currentMapKey].push(letter);
      keyIndex = (keyIndex + 1) % keyString.length;
    }

    return keyMap;
  }

  encrypt(originalText: string, round: number): string {
    const text = originalText.replace(" ", "");

    const keyString = this.key.toString();
    const keyMap = this.getKeyLetterMap(text);

    const result = keyString
      .split("")
      .sort((a, b) => Number(a) - Number(b))
      .reduce((acc, key) => {
        return `${acc}${keyMap[key].join("")}`;
      }, "");

    if (round > 1) {
      return this.encrypt(result, --round);
    }

    return result;
  }

  isMapEmpty(map: Record<string, string[]>) {
    for (const key in map) {
      if (map[key].length) {
        return false;
      }
    }

    return true;
  }

  decrypt(cipherText: string, round: number): string {
    const keyString = this.key.toString();
    const numberLettersInColumn = Math.floor(
      cipherText.length / keyString.length
    );
    let numberOfRemainLetters = cipherText.length % keyString.length;
    const keyMap: Record<string, number> = {};

    for (let key of keyString) {
      keyMap[key] = numberLettersInColumn;

      if (numberOfRemainLetters) {
        keyMap[key] += 1;
        numberOfRemainLetters--;
      }
    }

    const originalTextMap = this.getKeyMap();

    let startIndex = 0;

    keyString
      .split("")
      .sort((a, b) => Number(a) - Number(b))
      .forEach((key) => {
        originalTextMap[key] = cipherText
          .substr(startIndex, keyMap[key])
          .split("");
        startIndex += keyMap[key];
      });

    let result = "";

    while (!this.isMapEmpty(originalTextMap)) {
      for (const key of keyString) {
        if (originalTextMap[key].length) {
          result += originalTextMap[key].shift();
        }
      }
    }

    if (round > 1) {
      return this.decrypt(result, --round);
    }

    return result;
  }
}
