class ColumnarCipher {
    constructor(key) {
        this.key = key;
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

    encrypt(text) {
        const keyString = this.key.toString();
        const keyMap = this.getKeyLetterMap(text);
        
        return keyString.split('').sort((a, b) => a - b).reduce((acc, key) => {
            return `${acc}${keyMap[key].join('')}`
        }, '');
    }

    isMapEmpty(map) {
        for (const key in map) {
            if (map[key].length) {
                return false;
            }
        }

        return true;
    }

    decrypt(cipherText) {
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
                result += originalTextMap[key].shift();
            }
        }

        return result;
    }
}


const columnarCipher = new ColumnarCipher(4321);

console.assert(columnarCipher.encrypt('hello') === 'lleho', "columnarCipher.encrypt('hell') === 'lleh' fail")
console.assert(columnarCipher.decrypt('lleho') === 'hello', "columnarCipher.decrypt('lleho') === 'hello' fail")
