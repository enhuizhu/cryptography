import { expect } from 'chai';
import { DESCipher } from './DESCipher';

describe('DESCipher test suites', () => {
  const keyString = `0001001100110100010101110111100110011011101111001101111111110001`;
  const dESCipher = new DESCipher(keyString, (input: string) => {
    return input;
  });

  it('leftShift', () => {
    expect(dESCipher.leftShift("12345678", 1)).to.eq('23456781');
    expect(dESCipher.leftShift("12345678", 2)).to.eq('34567812');
  });

  it('reduceKeySizeFrom56To48', () => {
    const bitText = dESCipher.generateBitData(56);
    expect(dESCipher.reduceKeySizeFrom56To48(bitText).length).to.eq(48);
  });

  it('expansionAndPermutationTo48bit', () => {
    const bitText = dESCipher.generateBitData(32);
    expect(dESCipher.expansionAndPermutationTo48bit(bitText).length).to.eq(48);
  });

  it('permute32Bit', () => {
    const bitText = dESCipher.generateBitData(32);
    expect(dESCipher.permute32Bit(bitText).length).to.eq(32);
  });

  it('bitsXor', () => {
    expect(dESCipher.bitsXor('111', '111')).to.eq('000');
    expect(dESCipher.bitsXor('011', '111')).to.eq('100');
    expect(dESCipher.bitsXor('011', '101')).to.eq('110');
  });
  
  it('keyCheck', () => {
    const keyString2 = `1001001100110100010101110111100110011011101111001101111111110001`;
    expect(dESCipher.keyCheck(keyString2)).to.be.false;
  });

  it('fourtyeightBitToThirtytwoBit', () => {
    const bitText = dESCipher.generateBitData(48);
    expect(dESCipher.fourtyeightBitToThirtytwoBit(bitText).length).to.eq(32);
  });

  it('encrypt and decrypt', () => {
    const testBitText = '0001011001001111011111011000110001001111110110011000010100011101';
    const cipherBitText = '0001011011010000101110010100011101110100111100100101000111111001';
    expect(dESCipher.encrypt(testBitText)).to.eq(cipherBitText);
    expect(dESCipher.decrypt(cipherBitText)).to.eq(testBitText);
  });

});