const ky = require('ky-universal');

async function UUIDToName(uuid) {
    return (await getByUUID(uuid)).name;
}

async function nameToUUID(name) {
    return (await getByName(name)).id;
}

async function getByName(name) {
    return await ky.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).json(); 
}

async function getByUUID(uuid) {
    return await ky.get(`https://api.mojang.com/user/profile/${uuid}`).json(); 
}

module.exports = {
    nameToUUID, UUIDToName, getByName, getByUUID
};