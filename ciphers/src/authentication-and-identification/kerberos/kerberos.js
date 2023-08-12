class Kerberos {
    constructor(config) {
        this.KASURL = config.KASURL;
        this.TGSURL = config.TGSURL;
        this.serviceURL = config.serviceURL;
        this.username = config.username;
        this.password = config.password;
        this.KAKAS = config.KAKAS;
    }

    authentication() {
        return fetch({
            url: this.KASURL,
            body: JSON.stringify({
                username
            })
        }).then(result => {
            this.KATGS = result.KATGS;
            // it's encrypted by KKASTGS
            this.AUTHTICKET = result.AUTHTICKET;
        })
    }

    authorization() {
        const authenticattor = this.encrypt({
            username: this.username,
            T2: +new Date(),
        }, this.KATGS);

        fetch({
            url: this.TGSURL,
            data: JSON.stringify({
                authticket: this.AUTHTICKET,
                authenticattor,
            })
        }).then(result => {
            if (result.serviceName !== 'B') {
                throw new Error("servie name is not valid");
            }

            if (!validateTimeStamp(result.T3)) {
                throw new Error('Timestamp is not valid ')
            }

            this.KAB = result.KAB;
            // it's encrypted by KBTGS
            this.SERVTICKET = result.SERVTICKET 
        })
    }

    encrypt(data, key) {
        return {
            data, 
            key
        }
    }

    service() {
        const timestamp = +new Date();
        const authenticattor = this.encrypt({
            username: this.username,
            T4: timestamp,
        }, this.KAB);

        fetch({
            url: this.serviceURL,
            data: JSON.stringify({
                SERVTICKET: this.SERVTICKET,
                authenticattor
            })
        }).then(result => {
            if (result.timestamp !== timestamp + 1 ) {
                throw new Error('timestamp is not valid');
            }

            // do something base on the result;
        })
    }

    validateTimeStamp(timestamp) {
        return true;
    }
}

module.exports = { Kerberos }