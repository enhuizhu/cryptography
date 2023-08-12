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

import { euclideanGCD } from '../../number-theory/euclidean-algorithm/euclideanGCD'

export class RSA {
  private N: number;
  private ON: number;
  private E: number;
  private D: number;
  
  constructor(p: number, q: number) {
    this.N = this.getN(p, q);
    this.ON = this.getON(p, q);
    this.E = this.getE(this.ON);
    this.D = this.getD();
  }

  getN(p: number, q: number) {
    return p * q;
  }

  getON(p: number, q: number) {
    return (p - 1) * (q - 1);
  }

  getE(ON: number) {
    const max = Math.round(Math.sqrt(ON));
    
    for (let i = 2; i <= ON; i++) {
      if (euclideanGCD(i, ON) === 1) {
        return i;
      }
    }

    throw new Error(`can not get E or ${ON}`);
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

  encryptM(m: number) {
    let result = 1;
    
    for (let i = 1 ; i <= this.E; i++) {
      result = result * (m % this.N) % this.N
    }

    return result % this.N;
  };

  decryptC(c: number) {
    let result = 1;
    
    for (let i = 1 ; i <= this.D; i++) {
      result = result * (c % this.N) % this.N
    }

    return result % this.N;
  }

  encrypt(plainTextNumberArr: number[]) {
    const result = [];

    for (const plainTextNumber of plainTextNumberArr) {
      result.push(this.encryptM(plainTextNumber));
    }

    return result;
  }

  decrypt(cipHerTextNumberArr: number[]) {
    const result = [];

    for (const cipherTextNumber of cipHerTextNumberArr) {
      result.push(this.decryptC(cipherTextNumber));
    }

    return result;
  }
}
