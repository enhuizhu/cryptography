/**
 * Galois Counter Mode
 * 
 * description:
 * Combines the counter mode of encryption with 128-bit block
 * and GHASH(Galois hash) hashing. In each step of GHASH, the previous
 * GHASH digest is added with an XOR, to the current cipher text
 * block
 * 
 * typical application:
 * High performance message authentication, usually in conjunction
 * with AES encryption
 * 
 * Used in TLS 1.3
 * 
 * Recommended for high speed networking
 * 
 * Galois counter mode (GCM) combines the counter mode of encryption
 * with 128 bit block and GHASH(Galois hash) hashing. In each step of 
 * GHASH, the previous GHASH digest is added with an XOR operation to 
 * the current cipher text block
 * 
 * This mode provides both confidentiality and authentication
 * 
 * Ghash.io was a bit coin mining pool subsidiary of CEX.io that operated
 * from 2013 - 2016
 * 
 * 
 * GCM uses a block cipher with block size 128 bits operated in counter mode
 * for encryption, and use arithmetic in the Galois field GF(2^128) to compute
 * the authentication tag, hence the name
 * 
 * GCM mode is used in many places including:

IEEE 802.1AE (MACsec) Ethernet security
IEEE 802.11ad (also dubbed WiGig)
ANSI (INCITS) Fibre Channel Security Protocols (FC-SP)
IETF IPsec standards
SSH
TLS 1.2
TLS 1.3.
AES-GCM is included in the NSA Suite B Cryptography and its latest replacement in 2018 Commercial National Security Algorithm (CNSA) suite. GCM mode is used in the SoftEther VPN server and client, as well as OpenVPN. It is an increasingly prominent mode, used for packet processing in applications such as fast networking. This mode is defined in the FIPS 800-38D and the IEEE 802.1ae standards and is recommended for high-speed networking.
 */
const { CipherCore } = require('../../lib/CipherCore');

class GCM extends CipherCore {
    constructor(key, authData) {
        super();
        this.key = key;
        this.authData = authData;
        this.IV = '10111110110001011001010001100111010101101011111010010011100000000101110001111000100010110001011111010101010110101010000101010011';
        this.currentCounter = this.IV;
        this.H = this.encryptFunction('00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');
    }

    increaseCounter() {
         this.currentCounter = this.bitsXor(this.currentCounter, this.IV);
    }

    encryptFunction(input) {
        this.bitsXor(input, this.key);
    }

    multH(input) {
        return input & this.H;
    }

    encrypt(plainTextArr) {
        const ghashResult = this.ghash(this.H, this.authData, this.IV);
        const cipherTextResults  = [];
        let currentMultiHResult = this.multH(this.authData);

        for (const plainText of plainTextArr) {
            this.increaseCounter();
            const counterEncryptResult = this.encryptFunction(this.currentCounter);
            const cipertext = this.bitsXor(plainText, counterEncryptResult);
            const xorCipherAndMultH = this.bitsXor(cipertext, currentMultiHResult);
            currentMultiHResult = this.multH(xorCipherAndMultH);
        }

        const finalXorResult = this.bitsXor(this.authData.length.toSting(2), currentMultiHResult);
        currentMultiHResult = this.multH(finalXorResult);

        return this.bitsXor(ghashResult, currentMultiHResult);
    }

    /**
     * 
     * @param {*} H 
     * @param {*} A 
     * authdata
     * @param {*} C 
     * cipertext
     */
    ghash(H, A, C) {
        // to do need to implement ghash
        return this.bitsXor(H, this.bitsXor(A, C));
    }
}

module.exports = { GCM };
