export const extendsEuclideanGCD = (a: number, b: number): number => {
    let dividend = a;
    let divisor = b;

    if (b > a) {
        dividend = b;
        divisor = a;
    }

    // a = x_1 * a  + y_1 * b;
    const r_1 = dividend;
    const x_1 = 1;
    const y_1 = 0;
    
    // b = x_0 * a + y_0 * b;
    const r0 = divisor;
    const x0 = 0;
    const y0 = 1;

    const q1 = Math.floor(r_1 / r0);

    /**
     * x1 = 1 - q1 * 0 = 1
     */
    const x1 = x_1 - q1 * x0;
    /**
     * y2 = 0 - q1 * 1 = -q1
     */
    const y2 = y_1 - q1 * y0;

    /**
     * r1 = dividend - q1
     */
    const r1 = dividend * x1 + divisor * y2;

    if (r1 === 0) {
        return divisor;
    }

    return extendsEuclideanGCD(divisor, r1);
}
