import { CipherCore } from "../../lib/CipherCore";

// XOR
export class VernamCipher extends CipherCore {
  public key: string = "";

  constructor(key?: string) {
    super();

    if (key) {
      this.key = key;
    }
  }

  setKey(key: string) {
    this.key = key;
  }

  encrypt(originalMsg: string) {
    const msg = originalMsg.replace(/\s/g, "");
    const repeatedKey = this.generateCorrespondKey(this.key, msg);
    let result = "";

    for (let i = 0; i < repeatedKey.length; i++) {
      const keyPos = this.getLetterPos(repeatedKey[i]);
      const letterPos = this.getLetterPos(msg[i]);
      const cipherPos = (keyPos ^ letterPos) % 26;

      result += this.alphabets[cipherPos];
    }

    return result;
  }

  decrypt(cipherTexts: string) {
    const msg = cipherTexts.replace(/\s/g, "");
    const repeatedKey = this.generateCorrespondKey(this.key, msg);
    let result = "";

    for (let i = 0; i < repeatedKey.length; i++) {
      const keyPos = this.getLetterPos(repeatedKey[i]);
      const cipherPos = this.getLetterPos(msg[i]);
      const letterPos = (keyPos ^ cipherPos) % 26;

      result += this.alphabets[letterPos];
    }

    return result;
  }
}
