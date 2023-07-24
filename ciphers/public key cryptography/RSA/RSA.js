/**
 * 1. p, q two prime numbers: private, chosen
 * 2. n = p x q
 * 3. e with gcd(o(n), e) = 1 and 1 < e < o(n): public chosen
 * 4. d = e-1 mode o(n) private, calculated
 *
 *
 * Ci = Math.pow(Mi, e) mode N
 * Mi = Math.pow(Ci, d) mode N
 *    = Math.pow(Math.pow(Mi, e) mode N, d) mode N
 *    = Math.pow(Mi, ed) mode n
 *    = Mi
 *
 * For the RSA algorithm to work, the following requirements
 * must be met.
 * 1. it's possible to find values of e, d and n such that
 * Math(M, ed) mode n = M for all the M
 * 2. it's relatively easy to calculate Math.pow(M, e) mode n
 * and Math.pow(c, d) mode n for values of M
 * 3. it's infeasible to determine d given e and n
 */

class RSA {
  constructor(p, q) {
    this.N = this.getN(p, q);
    this.ON = this.getON(p, q);
    this.E = this.getE();
    this.D = this.getD();
  }

  getN(p, q) {
    return p * q;
  }

  getON(p, q) {
    return (p - 1) * (q - 1);
  }

  getE(ON) {
    return ON - 1;
  }

  getD() {
    let numberOfON = 1;

    while ((this.ON * numberOfON + 1) % this.E !== 0) {
      numberOfON++;
    }

    return (this.ON * numberOfON + 1) / this.E;
  }

  getPublicKey() {
    return {
      e: this.E,
      n: this.N,
    };
  }

  getPrivateKey() {
    return {
      n: this.N,
      d: this.D,
    };
  }

  encrypt(plainTextNumberArr) {
    const result = [];

    for (const plainTextNumber of plainTextNumberArr) {
      result.push(Math.pow(plainTextNumber, this.E)) % this.N;
    }

    return result;
  }

  decrypt(cipHerTextNumberArr) {
    const result = [];

    for (const cipherTextNumber of cipHerTextNumberArr) {
      result.push(Math.pow(cipherTextNumber, this.D) % this.N);
    }

    return result;
  }
}
