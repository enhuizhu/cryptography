/**
 * 1. base on discrete logarithms.
 *
 * 2. prime number q and a
 * a < q
 * both a and q maybe public
 * a is primitive root
 * 
 * alice could send them in the first message
 *
 * 3. random number Xa, Xb, Xa < q, Xb < q.
 * both less than q, these are their private keys
 *
 *
 * 4. Ya = Math.pow(a, Xa) % q;
 *    Yb = Math.pow(a, Xb) % q;
 *
 * There are the public keys (Diffie-Hellman half keys)
 *
 * 5.Alice and Bob exchange Ya and Yb(the public keys; private keys of cause remain private)
 *
 * 6.Alice compute Ka = Math(Yb, Xa) % q
 *   Bob compute Kb = Math(Ya, Xb) % q
 *
 * The important pint is that Ka is equal to Kb
 * this is now their shared secret key.
 *
 * Attacking the key
 *
 * is it possible for charlie to attack this key? He knows that
 * q = 353, a = 3, Ya = 40, Yb = 248
 *
 * in this example, it would be possible by brute force to determine
 * the secret key = 160. in particular, charlie can determine K by
 * discovering a solution to
 * the question Math(3, Xa) % 353 = 40 or Math(3, Xb) % 353 = 248
 *
 * the brute-force approach would be calculate power of 3 mode 353
 * stopping when the result equals either 40 or 238. Here, the desired
 * answer is reached wih the exponent value of 97 which provides 3^97 mod 353 = 40
 *
 * however, with larger number the brute-force approach becomes impractical
 * 
 * Weaknesses of Diffie-Hellman key exchange
 * 1. the main weakness of Diffie-Hellman as presented thus far is that keys
 * are unauthenticated and, thus vulnerable to the following man-in-the-middle
 * attack
 * 
 * Charlie knows q = 353, a = 3;
 * 
 * when bob send Yb to alice, Charlie can intercept it and replace it with his own
 * Yc with Yb and send it to alice. Charlie can generate Xc which is less then 353,
 * and Yc = Math(a, Xc) % q;
 * 
 * when alice send Ya to bob, Charlie can intercept it and replace it with his own 
 * Yc2 with Ya and send it to bob. Charlie can generate Xc2 which is less then 353,
 * and Yc2 = Math(a, Xc2) % q;
 * 
 * when alice receive Yc, 
 * Ka = Math.pow(Yc, Xa) % q;
 *    = Math.pow(a^Xc % q, Xa) % q;
 *    = a^(Xc.Xa) % q
 * 
 * Kca = Math.pow(Ya, Xc) % q;
 *    = Math.pow(a^Xa % q, Xc) % q
 *    = a^(Xc.Xa) % q;
 * 
 * Kcb = Math.pow(Yb, Xc) % q;
 *    = Math.pow(a^Xb % q, Xc) % q
 *    = a^(Xb.Xc) % q;
 * 
 * when bob receive Yc, 
 * Kb = Math.pow(Yc, Xb) % q;
 *    = Math.pow(a^Xc % q, Xb) % q
 *    = a^(Xc.Xb) % q
 *  
 * What is the fundamental reason for this weakness and what can be done about it?
 * 
 * The Diffie-Hellman key exchange is vulnerable to such an attack because it does not
 * authenticate the participants.
 * 
 * This vulnerability can be overcome with the use of digital signatures and public key
 * certificates to achieve mutual authentication between participants. Typically, this 
 * would be done by adding an exchange of digitally signed identification tokens.
 * 
 *  Group Diffie-Hellman for three or more principals
 * 
 * 1 Alice generate random number Xa, and send Ya = a ^ Xa  % q to bob
 * 2.Bob generate random number Xb, and send Yb = a ^ Xb % q to carl
 * 3.Carl generate random number Xc, and send Yc = a ^ Xc % q to alice
 * 4. Alice generate Yc' = Yc ^ Xa = (a ^ Xc) ^ Xa % q and send it to bob
 * 5. Bob generate Ya' = Ya ^ Xb = (a ^ Xa) ^Xb % q and send it to carl
 * 6. Carl generate Yb' = Yb ^ Xc = (a ^ Xb) ^ Xc % q and send it to alice
 * 7. Alice use private key get Yb' ^ Xa = a ^ (Xb x Xc x Xa) % q
 * 8. Bob use private key get Yc' ^ Xb = a ^ (Xc x Xa x Xb) % q 
 * 9. Carl use private key get Ya' ^ Xc = a ^ (Xa x Xb x Xc) % q  
 * so at the end Alice, bob and Carl can get the same key
 */
export class DiffieHellMan {
  public q: number;
  public a: number;

  private Xa: number;
  private Xb: number;

  public Ya: number;
  public Yb: number;

  constructor(q: number, a: number) {
    if (a >= q) {
      throw new Error("a must be smaller then q!");
    }

    this.a = a;
    this.q = q;

    this.Xa = this.generateNumber();
    this.Xb = this.generateNumber();

    this.Ya = Math.pow(this.a, this.Xa) % this.q;
    this.Yb = Math.pow(this.a, this.Xb) % this.q;
  }

  generateNumber() {
    return Math.round(Math.random() * this.q);
  }

  getKeyBaseOnYbAndXa() {
    return Math.pow(this.Yb, this.Xa) % this.q;
  }

  getKeyBaseOnYaAndXb() {
    return Math.pow(this.Ya, this.Xb) % this.q;
  }
}


