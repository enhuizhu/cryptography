/**
 * 1997
 * the US National Institute of Standards and Technology (NIST)
 * initialized a selection process for the successor of DES. One
 * of the submissions was the Rijndael cipher (named after it's
 * inventors Rijmen and Daemen)
 *
 * 2001
 * This encryption scheme was standardized as the Advanced
 * Encryption Standard.
 *
 * AES is a special case of Rijndael which admits more different
 * block lengths and ciphertext spaces
 *
 * AES uses a 128-bit block size and key size of 128, 192 or 256 bits
 * it does not use a Feistel structure but instead uses SPN
 *
 * the algorithm consists of 10 - 14 rounds depend on the key length
 * 10 rounds for 128-bit key, 12 rounds for 192-bit key and 14 rounds
 * for 256-bit key
 *
 * 10 -> 128
 * 12 -> 192
 * 14 -> 256
 * 
 * Each round work  on the state array.
 * input is an array of 16 bytes (as block size for AES is 128 bits)
 * in0, in1 ..., in15
 * before encryption begins, the bytes of this array are placed sequentially
 * in the columns of the inputBlock matrix(top to bottom), Within an algorithm,
 * operations are performed on a matrix of bytes called state matrix or simply state
 * 
 * the final value of the state matrix OutputBlock is the output of the algorithm and
 * is converted into a sequence of cipher text bytes out0, out1, ... out15
 * similarly for the 128 bit key size AES algorithm 16 bytes k0, k1, ... k15
 * for the columns of the inputKey matrix. the dimension of all all matrices
 * is 4 x 4
 * 
 * Each AES round consists of 4 transformations
 * 1. byte substitution - SubBytes(State)
 * 2. permutation - ShiftRows(State)
 * 3. arithmetric operations over a finite field - MixColumns(State)
 * 4. XOR with a key - AddRoundKey(State, key)
 * 
 * All four transformations are invertible
 */
class AESCipher {
  constructor() {

  }

  /**
   * 
   * @param {*} state 
   * 
   * replaces bytes using fixed S-box to achieve non-linearity.
   */
  subBytes(state: any) {

  }

  /**
   * 
   * @param {*} state 
   * permutation
   */
  shiftRow(state: any) {

  }

  /**
   * 
   * @param {*} state 
   * mix up bits to achieve a wider distribution of plaintext
   * in the whole message space.
   */
  mixColumns(state: any) {

  }

  /**
   * 
   * @param {*} state 
   * @param {*} key 
   * provides the necessary secret randomness
   */
  addRoundKey(state: any, key: any) {

  }

}
