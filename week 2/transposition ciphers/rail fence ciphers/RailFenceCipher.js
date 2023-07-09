class RailFenceCipher {
    constructor(depth) {
        this.depth = depth;
        this.UP = 'UP';
        this.DOWN = 'DOWN';
        
    }

    getMatrix(text) {
        const matrix = new Array(this.depth);
        
        let rowIndex = 0;
        let currentDirection = this.DOWN;
        
        for(const letter of text) {
            if (!matrix[rowIndex]) {
                matrix[rowIndex] = [];
            }

            matrix[rowIndex].push(letter);

            if (currentDirection === this.DOWN) {
                rowIndex += 1;
            } else {
                rowIndex -=1;
            }

            if (rowIndex >= this.depth - 1) {
                currentDirection = this.UP;
            } else if (rowIndex <= 0) {
                currentDirection = this.DOWN;
            }
        }
        
        return matrix;
    }

    encrypt(originalText) {
        const text = originalText.replaceAll(' ', '');
        const matrix = this.getMatrix(text);

        let result = '';

        for (const row of matrix) {
            result = `${result}${row.join('')}`;
        }

        return result;
    }

    isEmptyMatrix(matrix) {
        for (const row of matrix) {
            if (row.length) {
                return false;
            }
        }

        return true;
    }

    decrypt(cipherText) {
        const matrix = this.getMatrix(cipherText);

        const originalMatrix = [];
        let startIndex = 0;

        for (const row of matrix) {
            originalMatrix.push(cipherText.substr(startIndex, row.length).split(''));
            startIndex += row.length;
        }

        let result = '';
        let currentRowIndex = 0;
        let currentDirection = this.DOWN;

        while(!this.isEmptyMatrix(originalMatrix)) {
            if (originalMatrix[currentRowIndex].length) {
                result += originalMatrix[currentRowIndex].shift();
            }

            if (currentDirection === this.DOWN) {
                currentRowIndex++;
            } else {
                currentRowIndex--;
            }

            if (currentRowIndex >= this.depth - 1) {
                currentDirection = this.UP;
            }

            if (currentRowIndex <= 0) {
                currentDirection = this.DOWN;
            }
        }
        
        return result;
    }
}

const railFenceCipher = new RailFenceCipher(3);

const result = railFenceCipher.encrypt('WE ARE DISCOVERED FLEE AT ONCE');
console.assert(railFenceCipher.encrypt('WE ARE DISCOVERED FLEE AT ONCE') === 'WECRLTEERDSOEEFEAOCAIVDEN', "railFenceCipher.encrypt('WE ARE DISCOVERED FLEE AT ONCE') === 'WECRLTEERDSOEEFEAOCAIVDEN' fail")
console.assert(railFenceCipher.decrypt('WECRLTEERDSOEEFEAOCAIVDEN') === 'WEAREDISCOVEREDFLEEATONCE', "railFenceCipher.decrypt('WECRLTEERDSOEEFEAOCAIVDEN') === 'WEAREDISCOVEREDFLEEATONCE' fail");
