/**
 * El Gamal
 */

const { DiffieHellMan } = require("../DiffieHellman/DiffieHellman");

class ElGamal extends DiffieHellMan {
  constructor(q, a, encryptFunction, decryptFunction) {
    super(q, a);
    this.encryptFunction = encryptFunction;
    this.decryptFunction = decryptFunction;
    this.K = this.getKeyBaseOnYaAndXb();
  }

  encrypt(m) {
    return this.encryptFunction(this.K, m);
  }

  decrypt(c) {
    return this.decryptFunction(this.K, c);
  }
}

module.exports = { ElGamal };
