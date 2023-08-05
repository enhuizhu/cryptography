import { expect } from "chai";
import { VigenereCipher } from "./VigenereCipher";

describe("VigenereCipher test suites", () => {
  const vigenereCipher = new VigenereCipher('deceptive');

  it("generateCorrespondKey", () => {
    expect(
      vigenereCipher.generateCorrespondKey(
        "deceptive",
        "wearediscoveredsaveyourself"
      )
    ).to.equal("deceptivedeceptivedeceptive");
  });

  it("encryptMsg", () => {
    expect(
      vigenereCipher.encryptMsg("wearediscoveredsaveyourself")
    ).to.equal("ZICVTWQNGRZGVTWAVZHCQYGLMGJ");
  });

  it("decryptMsg", () => {
    expect(
      vigenereCipher.decryptMsg("ZICVTWQNGRZGVTWAVZHCQYGLMGJ")
    ).to.equal("WEAREDISCOVEREDSAVEYOURSELF");
  });
});
