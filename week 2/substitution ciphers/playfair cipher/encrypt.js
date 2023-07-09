/**
 * 
 * @param {*} text 
 * @returns 
 * 1. reorder alphabet base on key
 * 2. if pair is on same row, cipher letter is on the right
 * 3. if pair is on same column, cipher letter is under the original letter
 * 4. otherwise cipher letter is on another diagonal of small react
 */

// delete duplicate keys
const deleteDuplicateLetter = (text) => {
    let result = '';


    for (const letter of text) {
        if (!result.includes(letter)) {
            result = result.concat(letter);
        }
    }

    return result;
}

console.assert(deleteDuplicateLetter('abcc') === 'abc', "deleteDuplicateLetter('abcc') fail")
console.assert(deleteDuplicateLetter('aabbcc') === 'abc', "deleteDuplicateLetter('aabbcc') fail")


// delete letters from array base on key value
const deleteKeyLetterFromArray = (key, letterList) => {
    const newArray = [];

    for (const letter of letterList) {
        if (!key.includes(letter)) {
            newArray.push(letter);
        }
    }

    return newArray;
}

console.assert(deleteKeyLetterFromArray('a', ['a', 'b']).join('') === 'b', "deleteKeyLetterFromArray('a', ['a', 'b']) fail")
console.assert(deleteKeyLetterFromArray('ac', ['a', 'b', 'c', 'd', 'e', 'f']).join('') === 'bdef', "deleteKeyLetterFromArray('a', ['a', 'b']) fail")

const splitMessageIntoPair = (msg) => {
    const pairs = [];
    let pairsIndex = 0;

    for (let i = 0; i < msg.length; i++) {
        // delete all the space
        if (msg[i] === ' ') {
            continue;
        }
        
        const letter = msg[i];
        
        if (!pairs[pairsIndex]) {
            pairs[pairsIndex] = [];
        }

        if (pairs[pairsIndex].length < 2) {
            pairs[pairsIndex].push(letter.toUpperCase());
        }

        if (pairs[pairsIndex].length === 1) {
            // if next letter is duplicated letter or it is the last letter, then insert "x"
            if (msg[i+1] === letter || i === msg.length - 1) {
                pairs[pairsIndex].push('X');
            }
        }

        if (pairs[pairsIndex].length >=2) {
            pairsIndex+=1;
        }
    }

    return pairs
}


console.assert(splitMessageIntoPair('hello world').flat().join('') === 'HELXLOWORLDX', "splitMessageIntoPair('hello world') === 'helxloworldx' fail");


const isPairOnSameRow = (pair, matrix) => {
    for (let row = 0; row < matrix.length; row++) {
        const letters = matrix[row];

        if (letters.includes(pair[0]) && letters.includes(pair[1])) {
            return true;
        }
    }

    return false;
}

console.assert(isPairOnSameRow(['A', 'B'], [['A', 'B', 'C'], ['D', 'E', 'F']]), "isPairOnSameRow(['A', 'B'], [['A', 'B', 'C'], ['D', 'E', 'F']]) fail");
console.assert(!isPairOnSameRow(['E', 'B'], [['A', 'B', 'C'], ['D', 'E', 'F']]), "!isPairOnSameRow(['E', 'B'], [['A', 'B', 'C'], ['D', 'E', 'F']]) fail");

const isPairOnSameCol = (pair, matrix) => {
    for (let col = 0; col < matrix[0].length; col++) {
        const letters = matrix.map(row => row[col]);
        
        if (letters.includes(pair[0]) && letters.includes(pair[1])) {
            return true;
        }
    }

    return false;
}

console.assert(isPairOnSameCol(['A', 'D'], [['A', 'B', 'C'], ['D', 'E', 'F']]), "isPairOnSameCol(['A', 'D'], [['A', 'B', 'C'], ['D', 'E', 'F']]) fail");
console.assert(isPairOnSameCol(['E', 'B'], [['A', 'B', 'C'], ['D', 'E', 'F']]), "isPairOnSameCol(['E', 'B'], [['A', 'B', 'C'], ['D', 'E', 'F']]) fail");
console.assert(!isPairOnSameCol(['A', 'E'], [['A', 'B', 'C'], ['D', 'E', 'F']]), "!isPairOnSameCol(['A', 'E'], [['A', 'B', 'C'], ['D', 'E', 'F']]) fail");


const getLetterPosition = (letter, matrix) => {
    let pos = [];

    for (let row = 0; row < matrix.length; row++) {
        const xPos = matrix[row].indexOf(letter);

        if (xPos !== -1) {
            pos = [xPos, row];
            return pos;
        }
    }

    return pos;
}

console.assert(getLetterPosition('A',[['A', 'B', 'C'], ['D', 'E', 'F']]).join(',') === '0,0', "getLetterPosition('A',[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");
console.assert(getLetterPosition('B',[['A', 'B', 'C'], ['D', 'E', 'F']]).join(',') === '1,0', "getLetterPosition('B',[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");
console.assert(getLetterPosition('E',[['A', 'B', 'C'], ['D', 'E', 'F']]).join(',') === '1,1', "getLetterPosition('B',[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");


const getMirrorLetters = (pair, matrix) => {
    const positions = [
        getLetterPosition(pair[0], matrix),
        getLetterPosition(pair[1], matrix)
    ];

    const mirrorPos = [
        [positions[1][0], positions[0][1]],
        [positions[0][0], positions[1][1]],
    ];

    return [matrix[mirrorPos[0][1]][mirrorPos[0][0]], matrix[mirrorPos[1][1]][mirrorPos[1][0]]]
}

console.assert(getMirrorLetters(['A', 'E'],[['A', 'B', 'C'], ['D', 'E', 'F']]).join(',') === 'B,D', "getMirrorLetters(['A', 'E'],[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");
console.assert(getMirrorLetters(['A', 'F'],[['A', 'B', 'C'], ['D', 'E', 'F']]).join(',') === 'C,D', "getMirrorLetters(['A', 'F'],[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");


const getNextLetter = (letter, row) => {
    const pos = row.indexOf(letter);
    let newPos = pos + 1;

    if (row[newPos]) {
        return row[newPos];
    }

    return row[0];
}

console.assert(getNextLetter('A',['A', 'B', 'C']) === 'B', "getNextLetter('A',['A', 'B', 'C']) === 'B' fail");
console.assert(getNextLetter('C',['A', 'B', 'C']) === 'A', "getNextLetter('C',['A', 'B', 'C']) === 'A' fail");

const getNextPair = (pair, row) => {
    const newPair = [];

    for (const letter of pair) {
        newPair.push(getNextLetter(letter, row))
    }

    return newPair;
}

console.assert(getNextPair(['A','B'],['A', 'B', 'C']).join(',') === 'B,C', "getNextPair(['A','B'],['A', 'B', 'C']) fail");
console.assert(getNextPair(['A','C'],['A', 'B', 'C']).join(',') === 'B,A', "getNextPair(['A','C'],['A', 'B', 'C']) fail");

const getRow = (letter, matrix) => {
    for (const row of matrix) {
        if (row.includes(letter)) {
            return row;
        }
    }

    return [];
}

console.assert(getRow('A',[['A', 'B', 'C'], ['D', 'E', 'F']]).join(',') === 'A,B,C', "getRow('A',[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");
console.assert(getRow('E',[['A', 'B', 'C'], ['D', 'E', 'F']]).join(',') === 'D,E,F', "getRow('E',[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");

const getColIndex = (letter, matrix) => {
    for (let row = 0; row < matrix.length; row++) {
        const pos = matrix[row].indexOf(letter);

        if (pos !== -1) {
            return pos;
        }
    }

    return -1;
}

console.assert(getColIndex('A',[['A', 'B', 'C'], ['D', 'E', 'F']]) === 0, "getColIndex('A',[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");
console.assert(getColIndex('E',[['A', 'B', 'C'], ['D', 'E', 'F']]) === 1, "getColIndex('E',[['A', 'B', 'C'], ['D', 'E', 'F']]) fail");


// generate array base on key
const generateMatrix = (key) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const cleanedKey = deleteDuplicateLetter(key);
    const remainLetters = deleteKeyLetterFromArray(cleanedKey, letters);
    const newLetters = [...cleanedKey.split(''), ...remainLetters];
    const matrix = [];
    const rows = 5;
    const cols = 5;

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i].push(newLetters[i * rows + j]);
        }
    }

    return matrix;
}

const encrypt = (msg, key) => {
    const newMsg = msg.replaceAll('J', 'I');
    const matrix = generateMatrix(deleteDuplicateLetter(key));
    const msgPairs = splitMessageIntoPair(msg);
    
    let newPairs = [];

    for (pair of msgPairs) {
        if (isPairOnSameRow(pair, matrix)) {
            const row = getRow(pair[0], matrix);
            newPairs.push(getNextPair(pair, row));
        } else if (isPairOnSameCol(pair, matrix)) {
            const colIndex = getColIndex(pair[0], matrix);
            const arr = matrix.map(row => row[colIndex]);
            newPairs.push(getNextPair(pair, arr));
        } else {
            newPairs.push(getMirrorLetters(pair, matrix));
        }
    }

    return newPairs.flat().join('');
}

console.assert(encrypt('H', 'A') === 'NC');
console.assert(encrypt('H', 'B') === 'NC');
console.assert(encrypt('H', 'HELLO') === 'LV');

