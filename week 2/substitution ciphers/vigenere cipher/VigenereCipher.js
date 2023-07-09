const { CipherCore } = require('../lib/CipherCore');

class VigenereCipher extends CipherCore {
    constructor(key) {
        super();
        this.key = key;
        this.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    }
    
    getLetterPos(letter) {
        return this.alphabets.indexOf(letter.toUpperCase());
    }

    encryptLetter(keyLetter, letter) {
        const keyPos = this.getLetterPos(keyLetter);
        const letterPos = this.getLetterPos(letter);

        const encryptLetterPos  = (keyPos + letterPos) % this.alphabets.length;

        return this.alphabets[encryptLetterPos];
    }

    decryptLetter(keyLetter, cipherLetter) {
        const keyPos = this.getLetterPos(keyLetter);
        const cipherLetterPos = this.getLetterPos(cipherLetter);
        const letterPos  = (cipherLetterPos + this.alphabets.length - keyPos) % this.alphabets.length;

        return this.alphabets[letterPos];
    }

    encryptMsg(msg) {
        const msgWithoutSpace = msg.replaceAll(' ', '');
        const correspondKey = this.generateCorrespondKey(this.key, msgWithoutSpace);

        let result = '';

        for (let i = 0; i < correspondKey.length; i++) {
            result += this.encryptLetter(correspondKey[i], msgWithoutSpace[i]);
        }

        return result;
    }

    decryptMsg(cipherText) {
        const correspondKey = this.generateCorrespondKey(this.key, cipherText);

        let result = '';

        for (let i = 0; i < correspondKey.length; i++) {
            result += this.decryptLetter(correspondKey[i], cipherText[i]);
        }

        return result;
    }
}

const vigenereCipher = new VigenereCipher('deceptive');

console.assert(vigenereCipher.generateCorrespondKey('deceptive', 'wearediscoveredsaveyourself') === 'deceptivedeceptivedeceptive', "vigenereCipher.generateCorrespondKey('deceptive', 'wearediscoveredsaveyourself') fail");
console.assert(vigenereCipher.encryptMsg('wearediscoveredsaveyourself') === 'ZICVTWQNGRZGVTWAVZHCQYGLMGJ', "vigenereCipher.encryptMsg('wearediscoveredsaveyourself') === 'ZICVTWQNGRZGVTWAVZHCQYGLMGJ' fail");
console.assert(vigenereCipher.decryptMsg('ZICVTWQNGRZGVTWAVZHCQYGLMGJ') === 'WEAREDISCOVEREDSAVEYOURSELF', "vigenereCipher.decryptMsg('ZICVTWQNGRZGVTWAVZHCQYGLMGJ') === 'WEAREDISCOVEREDSAVEYOURSELF'' fail");

const vigenereCipher2 = new VigenereCipher('RELATIONS');
console.assert(vigenereCipher2.encryptMsg('TO BE OR NOT TO BE THAT IS THE QUESTION') === 'KSMEHZBBLKSMEMPOGAJXSEJCSFLZSY', "vigenereCipher2.encryptMsg('TO BE OR NOT TO BE THAT IS THE QUESTION') fail");

