const { CipherCore } = require('../lib/CipherCore');
/**
 * The Atbash cipher is a particular type of monoalphabetic cipher formed by taking the alphabet (or abjad, syllabary, etc.) 
 * and mapping it to its reverse, so that the first letter becomes the last letter, the second letter becomes the second to last letter
 */

class AtbashCipher extends CipherCore {
    constructor() {
        super();
    }

    encrypt(plainText) {
        let result = '';
        
        for(const letter of plainText) {
            const letterPos = this.alphabets.indexOf(letter);
            const newPos = 25 - letterPos;
            result += this.alphabets[newPos];
        }

        return result;
    }

    decrypt(cipherText) {
        return this.encrypt(cipherText)
    }
}

const atbashCipher = new AtbashCipher();
console.assert(atbashCipher.encrypt('A') === 'Z', "atbashCipher.encrypt('A') === 'Z' fail")
console.assert(atbashCipher.encrypt('AB') === 'ZY', "atbashCipher.encrypt('AB') === 'ZY' fail")
console.assert(atbashCipher.decrypt('ZY') === 'AB', "atbashCipher.encrypt('ZY') === 'AB' fail")
