/**
 *  LE15 = RE16 ^ F(LE16, K16), why?
 *  1. LE16 = RE15, so F(LE16, K16) = F(RE15, K16)
 *  2. RE16 = LE15 ^ F(RE15, K16)
 *  3. RE16 = LE15 ^ F(LE16, K16)
 *  4. LE15 = RE16 ^ F(LE16, K16)
 * 
 * AND we can get theory
 * LE_i = RE_i+1 ^ F(LE_i+i, K_i+1);
 */

class FeistelCipher {
    constructor(keys, encryptFunc, decryptFunc) {
        this.keys = keys;
        this.totalRound = keys.length;
        this.encryptFunc = encryptFunc;
        this.decryptFunc = decryptFunc;
    }

    // blocks text is two letter, so easily to approve the theory
    encrypt(blocksText) {
        if (blocksText.length !== 2) {
            throw new Error('only accept block text with length 2 for now')
        }

        let left = blocksText[0].charCodeAt();
        let right = blocksText[1].charCodeAt();

        let currentRound = 0;

        while(currentRound < this.keys.length) {
            const encryptRight = this.encryptFunc(right, this.keys[currentRound]);
            const temp = right;

            right = encryptRight ^ left;
            left = temp;
            currentRound += 1;
        }

        const temp = left;
        left = right;
        right = temp;

        return `${String.fromCharCode(left)} ${String.fromCharCode(right)}`;
    }

    decrypt(cipherText) {
        const blocks = cipherText.split(' ');
        let dLeft = blocks[0].charCodeAt();
        let dRight = blocks[1].charCodeAt();

        const copyKeys = [...this.keys];

        while(copyKeys.length) {
            const key = copyKeys.pop();
            const temp = dRight;
            dRight = this.encryptFunc(dRight, key) ^ dLeft;
            dLeft = temp;
        }

        return `${String.fromCharCode(dRight)}${String.fromCharCode(dLeft)}`;
    }
}

const feistelCipher = new FeistelCipher([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2], (input, k) => {
    let newPos = (input + k);

    if (newPos > 90) {
        newPos = newPos - 26;
    }

    return newPos;
});


console.assert(feistelCipher.encrypt('AB') === '\x03 @', "feistelCipher.encrypt('AB') === '\x03 @' fail");
console.assert(feistelCipher.decrypt('\x03 @') === 'AB', "feistelCipher.decrypt('\x03 @') === 'AB' fail");
