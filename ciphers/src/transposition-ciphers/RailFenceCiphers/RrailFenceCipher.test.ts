import { expect } from 'chai';
import { RailFenceCipher } from './RailFenceCipher';

describe('RailFenceCipher test suites', () => {
  const railFenceCipher = new RailFenceCipher(3);

  it('encrypt', () => {
    expect(railFenceCipher.encrypt("WE ARE DISCOVERED FLEE AT ONCE")).to.eq('WECRLTEERDSOEEFEAOCAIVDEN');
  });
  
  it('decrypt', () => {
    expect(railFenceCipher.decrypt("WECRLTEERDSOEEFEAOCAIVDEN")).to.eq('WEAREDISCOVEREDFLEEATONCE');
  });

});