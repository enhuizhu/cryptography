import { CipherCore } from ".././../lib/CipherCore";

export class CaesarCipher extends CipherCore {
  constructor() {
    super();
  }

  decrypt(c: string, k: number) {
    const encryptedLetterPosition = this.alphabets.indexOf(c.toUpperCase());
    let originalPosition = encryptedLetterPosition - k;

    if (originalPosition < 0) {
      originalPosition += this.alphabets.length;
    }

    return this.alphabets[originalPosition];
  }

  decryptText(encryptedText: string, key: number) {
    let result = "";

    for (const encryptedLetter of encryptedText) {
      result += this.decrypt(encryptedLetter, key);
    }

    return result;
  }

  encrypt(letter: string, key: number) {
    const originalPosition = this.alphabets.indexOf(letter.toUpperCase());
    const newPos = (originalPosition + key) % this.alphabets.length;

    return this.alphabets[newPos];
  }

  encryptText(text: string, key: number) {
    let result = "";

    for (const letter of text) {
      result += this.encrypt(letter, key);
    }

    return result;
  }
}
