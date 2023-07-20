const { CipherCore } = require('../lib/CipherCore');
/**
 * C = E(K, P) = P * K mod 26
 * D = D(K, C) = C * inverse(k) mod 26 = P * K * inverse(k) mod 26
 * inverse(k) = 1/determinant(k)*Adj(k)
 */

class HillCipher extends CipherCore {
    /**
     * 
     * @param {*} key 
     * key must be nxn matrix
     * 
     */
    constructor(key) {
        super();
        this.key = key;
    }

    getSubMatrix(rowIndex, colIndex, numberMatrix) {
        const result = [];
        let resultRowIndex = 0;
        
        for(let currentRowIndex = 0; currentRowIndex < numberMatrix.length; currentRowIndex++) {
            if (currentRowIndex === rowIndex) {
                continue;
            }

            if (!result[resultRowIndex]) {
                result[resultRowIndex] = [];
            }

            let resultColIndex = 0;

            for(let currentColIndex = 0; currentColIndex < numberMatrix[currentRowIndex].length; currentColIndex++) {
                if (currentColIndex === colIndex) {
                    continue;
                }

                result[resultRowIndex][resultColIndex] = numberMatrix[currentRowIndex][currentColIndex];
                resultColIndex++;
            }

            resultRowIndex++;
        }

        return result;
    }

    getCoFactorMatrix(numberMatrix) {
        const result = [];

        for (let row = 0; row < numberMatrix.length; row++) {
            for (let col = 0; col < numberMatrix[row].length; col++) {
                const value = Math.pow(-1, row+col) * this.determinantMatrix(this.getSubMatrix(row, col, numberMatrix));

                if (!result[row]) {
                    result[row] = [];
                }

                result[row].push(value);
            }
        }

        return result;
    }

    transposeMatrix(matrix) {
        const result = [];

        for(let row = 0; row < matrix.length; row++) {
            for(let col = 0; col < matrix[row].length; col++) {
                if (!result[col]) {
                    result[col] = [];
                }

                result[col][row] = matrix[row][col];
            }
        }

        return result;
    }
    /**
     * 伴随矩阵
     */
    adjointMatrix(numberMatrix) {
        const coFactorMatrix = this.getCoFactorMatrix(numberMatrix);
        return this.transposeMatrix(coFactorMatrix);
    }

    determinantMatrix(numberMatrix) {
        let result = 0;

        if (numberMatrix.length === 1 && numberMatrix[0].length ===1) {
            return numberMatrix[0][0];
        }
        
        if (numberMatrix.length === 2 && numberMatrix[0].length === 2) {
            return numberMatrix[0][0] * numberMatrix[1][1] - numberMatrix[0][1]*numberMatrix[1][0];
        }

        for(let col = 0; col < numberMatrix[0].length; col++) {
            result += Math.pow(-1, col) * (numberMatrix[0][col] * this.determinantMatrix(this.getSubMatrix(0, col, numberMatrix)));
        }

        return result;
    }

    getTextMatrix(originalPlainText) {
        const plainText = originalPlainText.replaceAll(' ', '').toUpperCase();
        const groupSize = this.key[0].length;
        const groups = [];

        let numberOfLetterRequired = plainText.length;
        let numberOfLettersToFill = 0;
        // const numberTextInARow = Math.ceil(numberOfLetterRequired / groupSize);

        let numberOfLetterRemain = numberOfLetterRequired % groupSize;
        if (numberOfLetterRemain !== 0) {
            numberOfLettersToFill = groupSize - numberOfLetterRemain;
        }
        
        let groupIndex = 0;

        for (let i = 0; i < numberOfLetterRequired + numberOfLettersToFill; i++) {
            if (!groups[groupIndex]) {
                groups[groupIndex] = [];
            }

            groups[groupIndex].push(plainText[i] ?? 'X');

            if (groups[groupIndex].length >= groupSize) {
                groupIndex++;
            }
        }

        return groups;
    }

    turnTextMatrixToNumberMatrix(textMatrix) {
        const numberMatrix = [];

        for (let row = 0; row < textMatrix.length; row++) {
            for (let col = 0; col < textMatrix[row].length; col++) {
                if (!numberMatrix[row]) {
                    numberMatrix[row] = [];
                }

                numberMatrix[row].push(this.getLetterPos(textMatrix[row][col]));
            }
        }

        return numberMatrix;
    }

    matrixMultiplication(numberMatrix, numberMatrix2) {
        // C = A(a * b) * B(b * c) 
        // Cxy = Ax1 * By1 ... Axb * Bby;
        const result = [];
        
        for(let y = 0; y < numberMatrix.length; y++) {
            if (!result[y]) {
                result[y] = [];
            }

            for(let x = 0; x < numberMatrix[y].length; x++) {
                if (!result[y][x]) {
                    result[y][x] = 0;
                }

                for(let i = 0; i < numberMatrix2.length; i++) {
                    result[y][x] += (numberMatrix[y][i] * numberMatrix2[i][x]);
                }
            }
        }

        return result;
    }

    turnNumberMatrixToText(numberMatrix) {
        let result = '';
        
        for (let row = 0; row < numberMatrix.length; row++) {
            for (let col = 0; col < numberMatrix[row].length; col++) {
                result += this.alphabets[numberMatrix[row][col]];
            }
        }

        return result;
    }

    encrypt(plainText) {
        const textMatrix = this.getTextMatrix(plainText);
        const numberMatrix = this.turnTextMatrixToNumberMatrix(textMatrix);
        
        let result = ``;

        for(const rowNumberMatrix of numberMatrix) {
            let encryptedNumberMatrix = this.matrixMultiplication([rowNumberMatrix], this.key);
            encryptedNumberMatrix = encryptedNumberMatrix.map((arr) => arr.map((num) => num % 26));
            
            result += this.turnNumberMatrixToText(encryptedNumberMatrix);
        }
        
        return result;
    }

    getInverseOfDeterminant(determinant) {
        let newDeterminant = determinant;

        if (newDeterminant < 0) {
            newDeterminant = newDeterminant % 26 + 26;
        }

        console.log(newDeterminant);
        
        let inverseDeterminant = 1;

        while((newDeterminant * inverseDeterminant) % 26 !== 1) {
            inverseDeterminant++;
            console.log(inverseDeterminant);
        }

        return inverseDeterminant;
    }

    decrypt(encryptedText) {
        const encryptedTextMatrix = this.getTextMatrix(encryptedText);
        const numberMatrix = this.turnTextMatrixToNumberMatrix(encryptedTextMatrix);
        const determinantK = this.determinantMatrix(this.key);
        // const inverseDeterminant = this.getInverseOfDeterminant(determinantK)
        // console.log({determinantK, inverseDeterminant});
        const adjointK = this.adjointMatrix(this.key);
        const inverseK =  adjointK.map(row => row.map((key) => key / determinantK));

        console.log({
            inverseK
        })
        let result = '';
        
        for(const rowNumberMatrix of numberMatrix) {
            let decryptedNumberMatrix = this.matrixMultiplication([rowNumberMatrix], inverseK);
            decryptedNumberMatrix = decryptedNumberMatrix.map((arr) => arr.map((num) => num % 26));
            result += this.turnNumberMatrixToText(decryptedNumberMatrix); 
        }

        return result;
    }
}

const key = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const hillCipher = new HillCipher(key);
// console.log(hillCipher.getSubMatrix(0, 0, [[1, 2], [3, 4]]));
// console.log(hillCipher.getSubMatrix(0, 0, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
// console.log(hillCipher.determinantMatrix([[1, 2], [3, 4]]));
// console.assert(hillCipher.determinantMatrix([[1]]) === 1, 'hillCipher.determinantMatrix([[1]]) === 1 fail');
// console.assert(hillCipher.determinantMatrix([[1, 2], [3, 4]]) === -2, 'hillCipher.determinantMatrix([[1, 2], [3, 4]]) === -2 fail');
// console.assert(hillCipher.determinantMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) === -24, 'hillCipher.determinantMatrix([[1, 2], [3, 4]]) === -24 fail');
// console.log(hillCipher.getCoFactorMatrix([[1, 2], [3, 4]]));
// console.log(hillCipher.transposeMatrix([[1, 2], [3, 4]]));
// console.log(hillCipher.transposeMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
// console.log('adjoint',hillCipher.adjointMatrix([[1, 2],[3, 4]]))

// console.log(hillCipher.determinantMatrix([
//     [6, 24, 1],
//     [13, 16, 10],
//     [20, 17, 15]
// ]))
// console.log(hillCipher.adjointMatrix([
//     [6, 24, 1],
//     [13, 16, 10],
//     [20, 17, 15]
// ]))


// // console.log(hillCipher.matrixMultiplication([[1, 1, 1]], [
// //     [1, 2, 3],
// //     [4, 5, 6],
// //     [7, 8, 9]
// // ]))

// console.log(hillCipher.encrypt('helloworld'));
// console.assert(hillCipher.getInverseOfDeterminant(23) === 17, 'hillCipher.getInverseOfDeterminant(23) === 17 fail')
// console.assert(hillCipher.getInverseOfDeterminant(-2) === 24, 'hillCipher.getInverseOfDeterminant(-2) === 24 fail')
// console.log(hillCipher.getInverseOfDeterminant(25))
// console.log(hillCipher.decrypt('WSONIDDTJWTQ'));


// console.log(hillCipher.matrixMultiplication([[7, 4, 11]], [
//     [6, 24, 1],
//     [13, 16, 10],
//     [20, 17, 15]
// ]))

// console.log(hillCipher.matrixMultiplication([[11, 14, 22]], [
//     [6, 24, 1],
//     [13, 16, 10],
//     [20, 17, 15]
// ]))

// console.log(hillCipher.matrixMultiplication([[14, 17, 11]], [
//     [6, 24, 1],
//     [13, 16, 10],
//     [20, 17, 15]
// ]))
// console.log(hillCipher.matrixMultiplication([[3, 23, 23]], [
//     [6, 24, 1],
//     [13, 16, 10],
//     [20, 17, 15]
// ]))

console.log(hillCipher.matrixMultiplication([[2, 3, 4]], [
    [8, 5, 10],
    [21, 8, 21],
    [21, 12, 8]
]))

// console.log(hillCipher.matrixMultiplication([[6, 24, 1],
//     [13, 16, 10],
//     [20, 17, 15]], [
//     [4, 8, 18],
//     [19, 4, 17],
//     [17, 6, 4]
// ]))
