import { expect } from 'chai';
import { ColumnarCipher } from './ColumnarCipher';

describe('ColumnarCipher test suites', () => {
  describe('when it has one round', () => {
    const columnarCipher = new ColumnarCipher('4321');
    
    it('encrypt', () => {
      expect(columnarCipher.encrypt('hello', 1)).to.eq('lleho');
    });
    it('decrypt', () => {
      expect(columnarCipher.encrypt('lleho', 1)).to.eq('hello');
    });
  });
  
  describe('when it has two rounds', () => {
    const columnarCipher = new ColumnarCipher('4321');
    
    it('encrypt', () => {
      expect(columnarCipher.encrypt('helloo', 2)).to.eq('oelolh');
    })
    it('decrypt', () => {
      expect(columnarCipher.encrypt('oelolh', 2)).to.eq('helloo');
    })
  })
});
