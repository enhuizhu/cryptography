import { expect } from 'chai';
import { FeistelCipher } from './FeistelCipher';

describe('FeistelCipher test suites', () => {
  describe('test suites for one round', () => {
    const feistelCipher = new FeistelCipher([1], (input, k) => {
      return (input ^ k) % 26;
    });
    
    it('putTextsIntoPairs', () => {
      expect(feistelCipher.putTextsIntoPairs('ABC')).to.deep.eq(['AB', 'CX']);
    });
  
    it('encrypt', () => {
      expect(feistelCipher.encrypt('AB')).to.eq('AB');
      expect(feistelCipher.encrypt('CD')).to.eq('AD');
  
    });
  
    it('decrypt', () => {
      expect(feistelCipher.decrypt('AB')).to.eq('AB');
      // CG
      expect(feistelCipher.decrypt('AD')).to.eq('CD');
    });
  
    it('encrypt message', () => {
      expect(feistelCipher.encryptMessage('ABCD')).to.eq('ABAD');
    });
  
    it('decrypt message', () => {
      expect(feistelCipher.decryptMessage('ABAD')).to.eq('ABCD');
    });
  });

  describe('test suites for two rounds', () => {
    const feistelCipher = new FeistelCipher([1, 2], (input, k) => {
      return (input ^ k) % 26;
    });
  
  
    it('encrypt', () => {
      expect(feistelCipher.encrypt('AB')).to.eq('DA');
      expect(feistelCipher.encrypt('CD')).to.eq('BA');
    });
  
    it('decrypt', () => {
      expect(feistelCipher.decrypt('DA')).to.eq('AB');
      expect(feistelCipher.decrypt('BA')).to.eq('CD');
    });
  
    it('encrypt message', () => {
      expect(feistelCipher.encryptMessage('ABCD')).to.eq('DABA');
    });
  
    it('decrypt message', () => {
      expect(feistelCipher.decryptMessage('DABA')).to.eq('ABCD');
    });
  })
  
});