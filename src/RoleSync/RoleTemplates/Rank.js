const Bot = require("../../Bot"); 

const Rank = async (uuid, cache, params) => {
    const rank = params[0];
    if (!rank) return;

    let slothpixel = Bot.getBot().slothpixel; 

    try {
        let player = await slothpixel(`players/${uuid}`);
         if (!player || !player.rank) return false; 
        return player.rank === rank; 
    } catch (err) {
        return false; 
    }
}

module.exports = Rank;