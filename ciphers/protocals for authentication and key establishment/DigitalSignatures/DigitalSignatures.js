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
 */

class DigitalSignature {
  // e public key, d private key
  constructor(key, signableMessages) {
    this.key = key;
    this.signableMessages = signableMessages;
  }

  SA(m) {
    let pos = (m - this.key) % 26;

    if (pos < 0) {
      pos += 26;
    }

    return pos;
  }

  Ee(s) {
    return (s + this.key) % 26;
  }

  VA(m, s) {
    return this.Ee(s) === m && this.signableMessages.includes(s);
  }
}

module.exports = { DigitalSignature };
