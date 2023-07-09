/**
 * originalPos + key mode 26 = cipher letter pos
 */

const decrypt = (c, k) => {
    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const encryptedLetterPosition = alphabets.indexOf(c.toUpperCase());
    let originalPosition = (encryptedLetterPosition - k);

    if (originalPosition < 0) {
        originalPosition += alphabets.length;
    }

    return alphabets[originalPosition];
}


console.assert(decrypt('B', '1') === 'A', "decrypt('B', '1') === 'A' fail");
console.assert(decrypt('B', '2') === 'Z', "decrypt('B', '2') === 'Z' fail");
console.assert(decrypt('B', '3') === 'Y', "decrypt('B', '3') === 'Y' fail");


const decryptText = (encryptedText, key) => {
    let result = '';

    for (const encryptedLetter of encryptedText) {
        result += decrypt(encryptedLetter, key);
    }

    return result;
}

console.assert(decryptText('IFMMP', 1) === 'HELLO', "decryptText('IFMMP', 1) === 'HELLO' fail");



