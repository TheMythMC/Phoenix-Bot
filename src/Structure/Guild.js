class Guild {
    constructor(data, isPremium = false) {
        this.data = data;
        this.isPremium = isPremium;
    }

    get id() {
        return this.data.ServerID;
    }

    set premium(premium) {
        this.isPremium = premium;
    }
}

module.exports = Guild;