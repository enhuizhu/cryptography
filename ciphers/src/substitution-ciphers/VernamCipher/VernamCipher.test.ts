import { expect } from 'chai';
import { VernamCipher } from './VernamCipher';

describe('VernamCipher test suite', () => {
  const vernamCipher = new VernamCipher('AB');

  it('should encrypt message correctly when pass the message', () => {
    expect(vernamCipher.encrypt('hello')).to.eq('HFLKO');
  });

  it('should decrypt message correctly when pass the cipher text', () => {
    expect(vernamCipher.decrypt('HFLKO')).to.eq('HELLO');
  })
});

