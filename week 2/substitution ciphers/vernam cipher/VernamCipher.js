const { CipherCore } = require('../lib/CipherCore');
// XOR
class VernamCipher extends CipherCore {
    constructor(key) {
        super();
        this.key = key
    }

    convertTextToCharCodes(text) {
        const result = [];

        for (const letter of text) {
            result.push(letter.charCodeAt(0));
        }

        return result;
    }

    encrypt(originalMsg) {
        const msg = originalMsg.replaceAll(' ', '');
        const repeatedKey = this.generateCorrespondKey(this.key, msg);
        let result = ''

        for (let i = 0; i < repeatedKey.length; i++) {
            const keyCharCode = repeatedKey[i].charCodeAt(0);
            const letterCharCode = msg[i].charCodeAt(0);
            const cipherCharCode = keyCharCode ^ letterCharCode;

            result+=String.fromCharCode(cipherCharCode);
        }

        return result;
    }
}

const vernamCipher = new VernamCipher('AB');
console.assert(vernamCipher.encrypt('HELLO') === '\t\x07\r\x0E\x0E', "vernamCipher.encrypt('HELLO') fail")
