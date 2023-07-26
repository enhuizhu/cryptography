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
