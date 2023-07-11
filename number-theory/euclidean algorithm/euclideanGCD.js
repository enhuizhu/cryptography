const euclideanGCD = (a, b) => {
    let dividend = a;
    let divisor = b;
    
    if (a < b) {
        dividend = b;
        divisor = a;
    }
    
    if (dividend % divisor === 0) {
        return divisor;
    }

    const remainder = dividend % divisor;
    return euclideanGCD(divisor, remainder);
}



console.assert(euclideanGCD(4, 2) === 2, "euclideanGCD(4, 2) === 2 fail");
console.assert(euclideanGCD(5, 7) === 1, "euclideanGCD(5, 7) === 1 fail");

module.exports = {euclideanGCD};