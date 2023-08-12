/**
 * El Gamal
 */

const { DiffieHellMan } = require("../DiffieHellman/DiffieHellman");

export class ElGamal extends DiffieHellMan {
  constructor(q: number, a: number, encryptFunction: any, decryptFunction: any) {
    super(q, a);
    this.encryptFunction = encryptFunction;
    this.decryptFunction = decryptFunction;
    this.K = this.getKeyBaseOnYaAndXb();
  }

  encrypt(m: number) {
    return this.encryptFunction(this.K, m);
  }

  decrypt(c: number) {
    return this.decryptFunction(this.K, c);
  }
}

