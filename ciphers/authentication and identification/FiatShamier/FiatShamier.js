/**
 * 1. Trent chooses two large numbers p and q to calculate n = p x q
 * n is announced to the public whereas p and q are kept secret.
 * 2. Peggey choose a secrete number s between 1 to n - 1 and calculate
 * v = Math.pow(s, 2) mod n peggey keeps s as her private key and register
 * v as her public key with trent (the third party).
 * 3. Victor knows v = Math.pow(s, 2) mod n but does not know s itself.
 * squaring modulo n is easy to compute, but square root modulo n is not
 */

const { euclideanGCD } = require('../../../number-theory/euclidean algorithm/euclideanGCD');

class FiatShamir {
    constructor(p, q, proversIP, verifierIP) {
        this.N = p * q;
        this.proversIP = proversIP;
        this.verifierIP = verifierIP;
    }

    generateProversKeyPair() {
        // private key
        // 1 to n - 1
        this.s = Math.round(Math.random() * (this.N - 2) + 1);
        // public key
        this.v = Math.pow(this.s, 2 ) % this.N;
    }

    /**
     * peggy generate random number r between 0 to n -1
     * r is called commitment, and the calculate witness
     * x = Math.pow(r, 2) mod and send it to victor
     */
    sendWitnessToVerifier() {
        // commitment 0 to n - 1
        this.r = Math.round(Math.random() * (this.N - 1));
        // witness
        this.x = Math.pow(r, 2) % this.N;

        fetch({
            url: this.verifierIP,
            method: 'post',
            data: JSON.stringify({
                witness: this.x 
            })
        }).then(console.log)
        .catch(console.error);
    }

    /**
     * verifier send challenge to c to prover
     */
    sendChallengeToProver() {
        // 0 or 1
        this.c = Math.round(Math.random());
        
        fetch({
            url: this.proversIP,
            method: 'POST',
            data: JSON.stringify({
                challenge: this.c
            })
        }).then(console.log)
        .catch(console.error)
    }

    calculateResponseAndSendToVerifier() {
        // Peggy send it to victor to show that she knows her
        // private key s modulo n, in doing so, she claim to be
        // peggy (who is the only one know private key)
        this.Y = (this.r * Math.pow(this.s, this.c)) % this.N;

        fetch({
            url: this.verifierIP,
            method: 'POST',
            data: JSON.stringify({
                y: this.Y
            })
        })
    }
    // witnessMuptiPublicKey = ((r^2 % n) * (s^2 % n)^c) % n
    // ypower = (r^2 * (s^c % n)^2) % n
    verifyY() {
        const yPower = Math.power(this.Y, 2) % this.N;
        
        
        const witnessMuptiPublicKey = (this.x * Math.pow(this.v, this.c)) % this.N;

        return yPower === witnessMuptiPublicKey;
    }
}

module.exports = { FiatShamir };
