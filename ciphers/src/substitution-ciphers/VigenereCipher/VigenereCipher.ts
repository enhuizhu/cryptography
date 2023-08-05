import { CipherCore } from "../../lib/CipherCore";
// (keyPos + letterPos) mod 26 === cipher letter pos
export class VigenereCipher extends CipherCore {
  private key: string = '';
  
  constructor(key?: string) {
    super();

    if (key) {
      this.key = key;
    }
  }

  setKey(key: string) {
    this.key = key;
  }

  getLetterPos(letter: string) {
    return this.alphabets.indexOf(letter.toUpperCase());
  }

  encryptLetter(keyLetter: string, letter: string) {
    const keyPos = this.getLetterPos(keyLetter);
    const letterPos = this.getLetterPos(letter);

    const encryptLetterPos = (keyPos + letterPos) % this.alphabets.length;

    return this.alphabets[encryptLetterPos];
  }

  decryptLetter(keyLetter: string, cipherLetter: string) {
    const keyPos = this.getLetterPos(keyLetter);
    const cipherLetterPos = this.getLetterPos(cipherLetter);
    const letterPos =
      (cipherLetterPos + this.alphabets.length - keyPos) %
      this.alphabets.length;

    return this.alphabets[letterPos];
  }

  encryptMsg(msg: string) {
    const msgWithoutSpace = msg.replace(/\s/g, "");
    const correspondKey = this.generateCorrespondKey(this.key, msgWithoutSpace);

    let result = "";

    for (let i = 0; i < correspondKey.length; i++) {
      result += this.encryptLetter(correspondKey[i], msgWithoutSpace[i]);
    }

    return result;
  }

  decryptMsg(cipherText: string) {
    const correspondKey = this.generateCorrespondKey(this.key, cipherText);

    let result = "";

    for (let i = 0; i < correspondKey.length; i++) {
      result += this.decryptLetter(correspondKey[i], cipherText[i]);
    }

    return result;
  }
}
