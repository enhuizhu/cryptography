import { expect } from 'chai';
import { DiffieHellMan } from './DiffieHellman';


describe('DiffieHellman test suite', () => {
  const diffieHellMan = new DiffieHellMan(3, 2);
  
  it('the final symmetric key should be the same', () => {
    expect(diffieHellMan.getKeyBaseOnYaAndXb()).to.equal(diffieHellMan.getKeyBaseOnYbAndXa());
  })
});