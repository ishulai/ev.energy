import * as OCMConfig from '../OCMConfig.json';

const apiKey = OCMConfig.apiKey;
const baseUrl = 'https://api.openchargemap.io/v3';

type ParamKey = 'key' | 'latitude' | 'longitude' | 'maxresults';

interface AddressInfo {
    AddressLine1: String,
    Town: String,
    StateOrProvince: String,
    Postcode: String,
};

interface Charger {
    AddressInfo: AddressInfo,
    ID: String,
};

class OpenChargeMap {
    async getNearby(longitude: Number, latitude: Number): Promise<Array<Charger>> {
        const params = {
            key: apiKey,
            latitude: latitude,
            longitude: longitude,
            maxresults: 10,
        };
        const paramString = Object.keys(params).map(key => `${key}=${params[key as ParamKey]}`).join('&');
        const res = await fetch(`${baseUrl}/poi?${paramString}`).then(r => {
            return r.json();
        });
        return res;
    }
}

const instance = new OpenChargeMap();

export {instance as default, AddressInfo, Charger};