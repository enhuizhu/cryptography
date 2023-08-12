export const euclideanGCD = (a: number, b: number): number => {
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

