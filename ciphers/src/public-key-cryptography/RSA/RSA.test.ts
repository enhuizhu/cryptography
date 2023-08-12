import { expect } from "chai";
import { RSA } from "./RSA";

describe("RSA test suites", () => {
  const rsa = new RSA(7, 11);

  it('should get correct public key', () => {
    // public link key should include N nad E
    // N is equal to p x q, E is number between 1 to o(n)
    // and the greatest common divisor is 1
    // for this example o(n) = (p - 1) x (q - 1) = 6 x 10 = 60
    // E for this scenario can be 59
    // E*D mod o(n) = 1 mod o(n)
    // so we get D = E-1 mod o(n)

    expect(rsa.getPublicKey()).to.deep.eq({
      e: 7,
      n: 77
    });
  })

  it('should get correct private key', () => {
    const privateKey = rsa.getPrivateKey();

    expect(privateKey).to.deep.eq({
      n: 77,
      d: 43
    })
  });


  it('should encrypt and decrypt the number correctly', () => {
    // encrypt Math.pow(m, e) % n;
    // decrypt Math.pow(c, d) % n;
    expect(rsa.encryptM(2)).to.eq(51);
    expect(rsa.decryptC(51)).to.eq(2);
  });
});
