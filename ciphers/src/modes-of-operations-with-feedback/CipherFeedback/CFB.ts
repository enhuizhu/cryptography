/**
 * Cipher Feedback mode
 *
 * Description:
 * Input is precessed s bits at a time. The preceding
 * cipher text is used as input to the encryption algorithm
 * to produce pseudorandom output, which is XORed with
 * plaintext to produce the next units of cipher text
 *
 * Typical Application:
 * Authentication
 *
 *
 * As with CBC, unites of plaintext are chained
 * together so that the cipher text of any plaintext
 * unite is a function of all the preceding plaintext.
 * Rather then blocks of b bits, plaintext is dived into
 * segments (ie unites of sbits. a common value is s = 8)
 *
 * Ci = Pi ^ (SelectSbit(E(K, Ii)))
 */

import { CipherCore } from '../../lib/CipherCore';

class CFB extends CipherCore {
  private IV: string;
  private encryptFunction: any;
  private key: any;
  

  constructor(key: any, encryptFunction: any) {
    super();
    this.key = key;
    this.IV = "10101010";
    this.encryptFunction = encryptFunction;
  }

  encrypt(plainTextArr: string[]) {
    let result = [];

    for (let i = 0; i < plainTextArr.length; i++) {
      const input = i === 0 ? this.IV : result[i - 1];
      // input need to shift left b - s | s bits;
      const encryptionResult = this.encryptFunction(this.key, input);
      const pickPartialResult = encryptionResult.substr(
        0,
        plainTextArr[i].length
      );
      const xorResult = this.bitsXor(pickPartialResult, plainTextArr[i]);

      result.push(xorResult);
    }

    return result;
  }

  decrypt(cipherTextArr: string[]) {
    let result = [];

    for (let i = 0; i < cipherTextArr.length; i++) {
      const input = i === 0 ? this.IV : result[i - 1];
      // input need to shift left b - s | s bits;
      const encryptionResult = this.encryptFunction(this.key, input);
      const pickPartialResult = encryptionResult.substr(
        0,
        cipherTextArr[i].length
      );
      const xorResult = this.bitsXor(pickPartialResult, cipherTextArr[i]);

      result.push(xorResult);
    }

    return result;
  }
}

module.exports = { CFB };