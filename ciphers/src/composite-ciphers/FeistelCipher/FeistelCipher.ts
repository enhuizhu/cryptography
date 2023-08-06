import { CipherCore } from "../../lib/CipherCore";
/**
 *  LE15 = RE16 ^ F(LE16, K16), why?
 *  1. LE16 = RE15, so F(LE16, K16) = F(RE15, K16)
 *  2. RE16 = LE15 ^ F(RE15, K16)
 *  3. RE16 = LE15 ^ F(LE16, K16)
 *  4. LE15 = RE16 ^ F(LE16, K16)
 *
 * AND we can get theory
 * LE_i = RE_i+1 ^ F(LE_i+i, K_i+1);
 * 
 * For decryption
 * LD_i = RE_16-i
 * RD_i = LE_16-i
 */

type EncryptFunc = (letter: number, key: number) => number;

export class FeistelCipher extends CipherCore {
  public keys: number[];
  public totalRound: number;
  public encryptFunc: EncryptFunc;

  constructor(keys: number[], encryptFunc: EncryptFunc) {
    super();
    this.keys = keys;
    this.totalRound = keys.length;
    this.encryptFunc = encryptFunc;
  }

  setKey(keys: number[]) {
    this.keys = keys;
  }

  // the text must contains two letters
  encrypt(blocksText: string) {
    if (blocksText.length !== 2) {
      throw new Error("only accept block text with length 2 for now");
    }

    let left = this.getLetterPos(blocksText[0]);
    let right = this.getLetterPos(blocksText[1]);

    const copyKeys = [...this.keys];

    while (copyKeys.length) {
      const key = copyKeys.shift();
      const encryptRight = this.encryptFunc(right, key as number);
      const temp = right;
      right = (encryptRight ^ left) % 26;
      left = temp;
    }

    return `${this.alphabets[right]}${this.alphabets[left]}`;
  }

  decrypt(cipherText: string) {
    let dLeft = this.getLetterPos(cipherText[0]);
    let dRight = this.getLetterPos(cipherText[1]);
    const copyKeys = [...this.keys];

    while (copyKeys.length) {
      const key = copyKeys.pop();
      
      const encryptRight = this.encryptFunc(dRight, key as number);
      const temp = dRight;
      dRight = (encryptRight ^ dLeft) % 26;
      dLeft = temp;
    }

    return `${this.alphabets[dRight]}${this.alphabets[dLeft]}`;
  }

  putTextsIntoPairs(texts: string) {
    const result = [];
    let pair = "";

    for (const letter of texts) {
      if (pair.length < 2) {
        pair += letter;

        if (pair.length == 2) {
          result.push(pair);
          pair = '';
        }
      }
    }

    if (pair.length === 1) {
      pair += 'X';
      result.push(pair);
    }
    
    return result;
  }

  encryptMessage(plainTexts: string) {
    const textPairs = this.putTextsIntoPairs(plainTexts);
    let result = '';

    for (const pair of textPairs) {
      result += this.encrypt(pair);
    }

    return result;
  }

  decryptMessage(cipherTexts: string) {
    const textPairs = this.putTextsIntoPairs(cipherTexts);
    let result = '';

    for (const pair of textPairs) {
      result += this.decrypt(pair);
    }

    return result;
  }
}
