class Guild {
    constructor(data) {
        this.data = data;
    }

    get id() {
        return this.data.ServerID;
    }
}

module.exports = Guild;