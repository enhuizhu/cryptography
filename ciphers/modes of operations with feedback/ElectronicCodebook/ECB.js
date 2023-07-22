/**
 * description:
 * Each block of 64 plaintext bits is encoded
 * independently using the same key.
 *
 * Typical application:
 * Secure transmission of single values (
 * eg an encryption key)
 *
 * Ci = E(K, Pi)
 * Pi = D(K, Ci)
 * 
 * why might ECB mode not be secure for longer message?
 * 
 * if the same b-bit block of plain text appears more then once
 * in the message, it always produce the same cipher text.
 * 
 * if the message is highly structured it maybe possible for a
 * cryptanalyst to exploit these regularities. for example, if 
 * it's known that the message always starts out with certain
 * predefined fields, then the cryptanalyst may have a number of
 * known plaintext-ciphertext pairs to work with.
 * 
 * because of this, ECM mode is not recommended for messages
 * longer then on block
 * 
 * when might we want to transmit a short amount of data (and
 * hence make use of ECB mode)?
 * 
 * a good example would be when we want to securely transmit 
 * an encryption key, such as a DES or AES key - ECB mode is
 * ideal under these circumstances.
 */

class ECB {
  constructor(key, encryptFunction, decryptFunction) {
    this.key = key;
    this.encryptFunction = encryptFunction;
    this.decryptFunction = decryptFunction;
  }

  encrypt(plaintext) {
    return this.encryptFunction(this.key, plaintext);
  }

  decrypt(cipherText) {
    return this.decryptFunction(this.key, cipherText);
  }
}
