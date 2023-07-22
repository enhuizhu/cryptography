/**
 * Output Feedback mode
 * 
 * description:
 * Similar to CFB, except that the input to the
 * encryption algorithm is the preceding encryption
 * output, and full blocks are used.
 * 
 * typical applications:
 * stream-oriented transmission over noisy chanel
 * (eg satellite communication)
 * 
 * Similar in structure to CFB, except for two differences:
 * 1. In OFB, the output of the encryption function is fed
 * back to shift register 
 * 2. OFB operates on full block, not on an s-bits subset
 * 
 * Ci = Pi ^ E(k, (...)) And Pi = Ci ^ E(K, (...))
 * 
 * 
 * About OFB
 * 
 * OFB has structure of a typical stream cipher (but one block at a time)
 * it generate a stream of bits as function of an initial value and a key,
 * and  that stream of bits is XORed with plaintext bits
 * 
 * The generated stream that is XORed with the plaintext is itself independent
 * of the plaintext
 */
const { CipherCore } = require('../../lib/CipherCore');

class OFB extends CipherCore {
    constructor(key, encryptFunction) {
        this.key = key;
        this.IV = '11110000';
    }

    encrypt(plainTextArr) {
        const result = [];
        let latestEncryptResult = this.IV;

        for (const plainText of plainTextArr) {
            latestEncryptResult = this.encryptFunction(this.key, latestEncryptResult);
            result.push(this.bitsXor(plainText, latestEncryptResult));
        }

        return result;
    }

    decrypt(cipherTextArr) {
        const result = [];
        let latestEncryptResult = this.IV;

        for (const cipherText of cipherTextArr) {
            latestEncryptResult = this.encryptFunction(this.key, latestEncryptResult);
            result(this.bitsXor(cipherText, latestEncryptResult));
        }

        return result;
    }
}

module.exports = { OFB };
