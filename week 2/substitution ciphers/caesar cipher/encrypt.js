const encrypt = (letter, key) => {
    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const originalPosition = alphabets.indexOf(letter.toUpperCase());
    const newPos = (originalPosition + key) % alphabets.length;

    return alphabets[newPos];
}


console.assert(encrypt('A', 1) === 'B', "encrypt('A', 1) === 'B' fail");
console.assert(encrypt('A', 2) === 'C', "encrypt('A', 2) === 'C' fail");
console.assert(encrypt('A', 3) === 'D', "encrypt('A', 3) === 'D' fail");

console.assert(encrypt('Z', 1) === 'A', "encrypt('Z', 1) === 'A' fail");
console.assert(encrypt('Z', 2) === 'B', "encrypt('Z', 2) === 'B' fail");
console.assert(encrypt('Z', 3) === 'C', "encrypt('Z', 3) === 'C' fail");


const encryptText = (text, key) => {
    let result = '';

    for (const letter of text) {
        result += encrypt(letter, key);
    }

    return result;
}

console.assert(encryptText('HELLO', 1) === 'IFMMP', "encryptText('HELLO', 1) === 'IFMMP' fail");



