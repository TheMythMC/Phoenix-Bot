const ky = require('ky-universal');

export async function UUIDToName(uuid) {
    return (await getByUUID(uuid)).name;
}

export async function nameToUUID(name) {
    return (await getByName(name)).id;
}

export async function getByName(name) {
    return await ky.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).json(); 
}

export async function getByUUID(uuid) {
    return await ky.get(`https://api.mojang.com/user/profile/${uuid}`).json(); 
}
