const ky = require('ky-universal');

export async function UUIDToName(uuid: String): Promise<String> {
    return (await getByUUID(uuid)).name;
}

export async function nameToUUID(name: String): Promise<String> {
    return (await getByName(name)).id;
}

async function getByName(name: String): Promise<Object> {
    return await ky.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).json(); 
}

async function getByUUID(uuid): Promise<Object> {
    return await ky.get(`https://api.mojang.com/user/profile/${uuid}`).json(); 
}
