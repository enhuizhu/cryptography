/**
 * Counter Mode
 * 
 * description
 * Each block of plaintext is XORed with an encrypted counter.
 * the counter is incremented for each subsequent block
 * 
 * typical application
 * General-purpose block-oriented transmission
 * 
 * useful for high speed requirements.
 * 
 * 
 * The counter mode (CTR) is very similar to output
 * feedback mode (OFB), but CTR uses the counter to be 
 * encrypted every time instead of waiting for the output
 * of encryption from the previous block, which means
 * that if you could obtain the counter directly, you could
 * encrypt and decrypt data in parallel
 * 
 * the counter has the same size as the used block
 */

const { CipherCore } = require('../../lib/CipherCore');

class CTR extends CipherCore {
    constructor(key, counters, encryptFunction) {
        this.nonce = "11110000";
        this.encryptFunction = encryptFunction;
        this.key = key;
        this.counters = counters;
    }

    encrypt(plainTextArr) {
        const result = [];
        
        for (let i = 0; i < plainTextArr.length; i++) {
            const input = this.nonce & this.counters[i];
            const encryptResult = this.encryptFunction(this.key, input);
            result.push(this.bitsXor(plainTextArr[i], encryptResult));
        }

        return result;
    }

    decrypt(cipherTextArr) {
        const result = [];
        
        for (let i = 0; i < cipherTextArr.length; i++) {
            const input = this.nonce & this.counters[i];
            const encryptResult = this.encryptFunction(this.key, input);
            result.push(this.bitsXor(cipherTextArr[i], encryptResult));
        }

        return result;
    }
}

module.exports = { CTR };
