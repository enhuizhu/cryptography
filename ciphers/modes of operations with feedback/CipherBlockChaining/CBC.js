/**
 * Description:
 * the input to the encryption algorithm is 
 * the XOR of the next 64bits of plaintext and
 * the preceding 64 bits of ciphertext
 * 
 * Typical application:
 * General-purpose block-oriented
 * transmission
 * Authentication
 * 
 * C0 = IV (an initialization vector) and 1 < i <= N:
 * 
 * Encryption:
 * C1 = E(k, IV ^ P1)
 * Ci = E(k, Ci-1 ^ Pi)
 * 
 * Decryption:
 * P1 = D(K, C1) ^ IV
 * pi = D(K, Ci) ^ Ci-1
 * 
 * Initialisation vector IV
 * 
 * A data block that is the size as the cipher block, IV
 * must be known to both sender and receiver but be unpredictable
 * by a third party and be protected against unauthorised changes.
 * This could be done by sending the IV using ECB encryption. However,
 * attacks based on prior knowledge of IV do exist.
 * 
 * Solving the problem of repeated blocks
 * Using CBC, repeating pattern of bits are not exposed. that is to say,
 * the input to the encryption function for each plaintext block bear no fixed
 * relationship to the plantext block.
 * 
 * CBC is therefor, appropriate for encrypting message of length grater
 * then b bits
 * 
 * properties:
 * 1. Identical plaintext blocks are mapped to different ciphertext.
 * 2. There are chained dependencies that is Ci depends on all preceding plaintext
 * 3. the system is self-synchronizing. if an error occurs (eg changed bits or dropped blocks)
 * in Ci, bt not Ci+1, then Ci+2 is correctly decrypted.
 */

const { CipherCore } = require('../../lib/CipherCore');

class CBC extends CipherCore {
    constructor(key, encryptFunction, decryptFunction) {
        this.key = key;
        this.encryptFunction = encryptFunction;
        this.decryptFunction = decryptFunction;

        this.IV = '1001001100110100010101110111100110011011101111001101111111110001';
    }

    encrypt(plainTextArr) {
        const result  = [];
        let preCipher = this.IV;

        for (const text of plainTextArr) {
            preCipher = this.encryptFunction(this.key, this.bitsXor(text, preCipher));
            result.push(preCipher);
        }

        return result;
    }

    decrypt(cipherTextArr) {
        const result = [];
        
        for (let i = 0; i < cipherTextArr.length; i++) {
            let plainText;
            
            const decryptResult = this.decryptFunction(this.key, cipherTextArr[i]);
            
            if (i === 0) {
                plainText = this.bitsXor(this.IV, decryptResult);
            } else {
                plainText = this.bitsXor(cipherTextArr[i-1], decryptResult);
            }

            result.push(plainText);
        }

        return result;
    }
}

module.exports = { CBC };
