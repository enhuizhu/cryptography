/**
 * consider the public key encryption system
 * Ee: [] -> []. suppose that []=[]
 *
 * if Dd is the decryption transformation corresponding to Ee.
 * then since both are permutations, it follows that:
 * Dd(Ee(m)) = Ee(Dd(m)) = m for all m -> []
 *
 * A public-key encryption schema of this type is called reversible
 * we can then construct a digital signature schema
 *
 * 1. let [] and [] be message and signature space with [] = []
 * 2. let (e, d) be a key for the public key encryption schema
 * 3. define signing function SA to be Dd. that is S = Dd(m)
 * 4. Define VA as
 * VA(m, s) = {
 *  true, // if (Ee(s)) = m
 *  false // otherwise
 * }
 * 
 * However, this schema would admit a forgery attack. you might like
 * to consider how this would be possible - how could an attacker undermine
 * the above above schema.
 * 
 * the first step would be for an attacker C to select a random s -> []
 * and compute m = Ee(s) what would the attacker do next?
 *
 * since [] = [] she can submit (m, s) as message with signature. Verification
 * would return true, even though A did not sign m
 * 
 * The solution to this is to let some subset []' -> [] constitute the signable
 * messages.
 * 
 * we redefine the verifier VA: [] -> {true, false} as 
 *Va(s) = {
    true, if Ee(s) -> []'
    false, otherwise
 } 
 *
 * RSA and DSA
 * 
 * Bob verifies whether h(m') = Ee(Dd(h(m)))
 * 
 * If the equality holds then the message has been signed by alice
 * The pair can be additionally encrypted for confidentially
 * 
 * Digital Signature Algorithm (DSA)
 * This is a USA Federal information Processing Standard for digital
 * signatures. it was proposed by the National Institute of Standards
 * and Technology (NIST) in August 1991 for use in their Digital Signature
 * Standard (DSS)
 * 
 */

const { RSA } = require('../../public-key-cryptography/RSA/RSA')

// digital signature need public key and also private key
// private key is used to sign the message
// public key is used to verify the message
// Alice send m and s = Sa(m) to bob
// s is decrypted by alice private key
// bob receive (m, s), bob will use VA to verify 
// if Ee(s) === m, if it's true, then the message
// is sent by alice.
class DigitalSignature {
  // e public key, d private key
  constructor(p, q, signableMessages) {
    this.RSA = new RSA(p, q);
    this.signableMessages = signableMessages;
  }
  
  // Signing transformation
  // SA is Dd it need private key
  // can use RSA to decrypt it 
  SA(m) {
    return this.RSA.decryptC(m);
  }

  // e is public key
  Ee(s) {
    return this.RSA.encrypt(s);
  }

  // verification transformation
  VA(m, s) {
    return this.Ee(s) === m && this.signableMessages.includes(s);
  }
}

module.exports = { DigitalSignature };
