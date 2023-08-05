// MAC key is symmetric key
// and it's shared by alice and bob
// alice send m and MAC' to bob
// bob use Hk(k, m) to generate MAC
// AND them compare it to MAC'
// if mac === MAC', then it means
// the message is sent by alice

// the only different between MAC and MDC is that
// MAC include a secret between Alice and Bob

class MAC {
  constructor(K, Hk) {
    this.K = K;
    this.Hk = Hk;
  }

  generateMAC(M) {
    return this.Hk(this.K, M);
  }

  validateMAC(mac, M) {
    const expectedMAC = this.generateMAC(M);

    if (expectedMAC !== mac) {
      throw new Error(`${mac} is not valid!`);
    }

    return true;
  }

  sendMacAndM(M) {
    return {
      MAC: this.generateMAC(M),
      M,
    };
  }
}

module.exports = { MAC };
