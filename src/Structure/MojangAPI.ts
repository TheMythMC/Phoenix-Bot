import ky from 'ky-universal';

export async function UUIDToName(uuid: string) {
    //@ts-ignore
    return (await getByUUID(uuid)).username;
}

export async function nameToUUID(name: string) {
    //@ts-ignore
    return (await getByName(name)).uuid;
}

export async function getByName(name: string): Promise<IMojangAPI>  {
    return await ky.get(`https://api.ashcon.app/mojang/v2/user/${name}`).json();
}

export async function getByUUID(uuid: string): Promise<IMojangAPI> {
    return await ky.get(`https://api.ashcon.app/mojang/v2/user/${uuid}`).json();
}

interface IMojangAPI {
    uuid: string,
    username: string,
    username_history: {
        username: string
    }[],
    textures: {
        custom: boolean,
        slim: boolean,
        skin: {
            url: string,
            data: string
        },
        raw: {
            value: string,
            signature: string
        }
    },
    created_at: string
}
