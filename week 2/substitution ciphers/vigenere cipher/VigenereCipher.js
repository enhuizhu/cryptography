class VigenereCipher {
    constructor(key) {
        this.key = key;
        this.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    }
    
    generateCorrespondKey(key, msg) {
        const restKeysLengthRequired = msg.length - key.length;
        const numberOfKey = Math.floor(restKeysLengthRequired / key.length);
        const remainKeyLength = restKeysLengthRequired % key.length;

        let finalKey = key;

        for (let i = 0; i < numberOfKey; i++) {
            finalKey = `${finalKey}${key}`;
        }

        if (remainKeyLength) {
            finalKey = `${finalKey}${key.substr(0, remainKeyLength)}`;
        }

        return finalKey;
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
        const correspondKey = this.generateCorrespondKey(this.key, msg);

        let result = '';

        for (let i = 0; i < correspondKey.length; i++) {
            result += this.encryptLetter(correspondKey[i], msg[i]);
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
