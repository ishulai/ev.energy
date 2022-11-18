const baseUrl = 'https://example.ev.energy';

class API {
    async startCharging(id: String): Promise<Object> {
        const res = await fetch(`${baseUrl}/chargingsession`, {
          method: 'POST',
          body: JSON.stringify({
            user: 1,
            car_id: 1,
            charger_id: id, 
          }),
        });
        return res;
    }
}

export default new API;