import { expect } from "chai";
import { CaesarCipher } from './CaesarCipher';

describe("caesar cipher test suite", () => {
    const caesarCipher = new CaesarCipher();
    
    it("test description", () => {
    expect(caesarCipher.decryptText("IFMMP", 1)).to.eql("HELLO");
  });

  it("test encryption", () => {
    expect(caesarCipher.encryptText("HELLO", 1)).to.eql("IFMMP");
  });
});
