/**
 * 1. put letters into different columns base on the key provided.
 * 2. read new letters from row to row.
 */

class ColumnarCipher {
    constructor(key, round = 1) {
        this.key = key;
        this.round = round;
    }

    getKeyMap(initValue) {
        const map = {};
        const keys = this.key.toString().split('');

        for (const item of keys) {
            map[item] = initValue === undefined ? [] : initValue;
        }

        return map;
    }

    getKeyLetterMap(text) {
        let keyIndex = 0;
        const keyString = this.key.toString();
        const keyMap = this.getKeyMap();
        
        for(const letter of text) {
            const currentMapKey = keyString[keyIndex];
            keyMap[currentMapKey].push(letter);
            keyIndex = (keyIndex + 1) % keyString.length;
        }

        return keyMap;
    }

    encrypt(originalText, round) {
        const text = originalText.replaceAll(' ', '')

        if (!round) {
            round = this.round
        }

        const keyString = this.key.toString();
        const keyMap = this.getKeyLetterMap(text);
        
        const result = keyString.split('').sort((a, b) => a - b).reduce((acc, key) => {
            return `${acc}${keyMap[key].join('')}`
        }, '');

        if (round > 1) {
            return this.encrypt(result, --round)
        }

        return result;
    }

    isMapEmpty(map) {
        for (const key in map) {
            if (map[key].length) {
                return false;
            }
        }

        return true;
    }

    decrypt(cipherText, round) {
        if (!round) {
            round = this.round;
        }

        const keyString = this.key.toString();
        const numberLettersInColumn = Math.floor(cipherText.length / keyString.length);
        let numberOfRemainLetters = cipherText.length % keyString.length;
        const keyMap = this.getKeyMap(0);
        
        for (let key of keyString) {
            keyMap[key] = numberLettersInColumn;
            
            if (numberOfRemainLetters) {
                keyMap[key] += 1;
                numberOfRemainLetters--;
            }
        }

        const originalTextMap = this.getKeyMap();

        let startIndex = 0;
        
        keyString.split('').sort((a, b) => a - b).forEach(key => {
            originalTextMap[key] = cipherText.substr(startIndex, keyMap[key]).split('');
            startIndex += keyMap[key];
        });

        let result = ''

        while(!this.isMapEmpty(originalTextMap)) {
            for (const key of keyString) {
                if (originalTextMap[key].length) {
                    result += originalTextMap[key].shift();
                }
            }
        }

        if (round > 1) {
            return this.decrypt(result, --round)
        }

        return result;
    }
}


const columnarCipher = new ColumnarCipher(4321);
console.assert(columnarCipher.encrypt('hello') === 'lleho', "columnarCipher.encrypt('hell') === 'lleh' fail")
console.assert(columnarCipher.decrypt('lleho') === 'hello', "columnarCipher.decrypt('lleho') === 'hello' fail")

const columnarCipher2 = new ColumnarCipher(4321, 2);
console.assert(columnarCipher.encrypt('helloo') === 'lleoho', "columnarCipher.encrypt('helloo') === 'lleoho' fail")
console.assert(columnarCipher.decrypt('lleoho') === 'helloo', "columnarCipher.decrypt('lleoho') === 'helloo' fail")

const columnarCipher3 = new ColumnarCipher(3571426, 2);
console.assert(columnarCipher3.encrypt('The Enigma cipher machine had the confidence of German forces who depended on its security') === 'diorofapeceohecnhhurarEwhyrhscedefioecfmneaiindTcttmneanisnpdogdnctGmeiheees', "columnarCipher3.encrypt('The Enigma cipher machine had the confidence of German forces who depended on its security') === 'diorofapeceohecnhhurarEwhyrhscedefioecfmneaiindTcttmneanisnpdogdnctGmeiheees' fail");