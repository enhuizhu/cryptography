class CipherCore {
    generateCorrespondKey(key, msg) {
        const restKeysLengthRequired = msg.length - key.length;
        const numberOfKey = Math.floor(restKeysLengthRequired / key.length);
        const remainKeyLength = restKeysLengthRequired % key.length;

        let finalKey = key;

        for (let i = 0; i < numberOfKey; i++) {
            finalKey = `${finalKey}${key}`;
        }

        if (remainKeyLength) {
            finalKey = `${finalKey}${key.substr(0, remainKeyLength)}`;
        }

        return finalKey;
    }
}

module.exports = {CipherCore}
