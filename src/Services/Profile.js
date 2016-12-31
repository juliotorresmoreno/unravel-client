import ServiceBase from '../Lib/ServiceBase';

const register = '/profile';

export default class Profile extends ServiceBase
{
    constructor(store)
    {
        super();
        this.update = (data) => {
            const url = store.getState().config.api + register;
            return new Promise((resolve, reject) => {
                this.put(url + "?token=" + store.getState().session.token, data)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                response.ok ?
                                    this.secure(resolve)({
                                        response: response,
                                        data: json
                                    }):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => {
                                response.ok ?
                                    this.secure(resolve)({response: response}):
                                    this.secure(reject)({error: error});
                            });
                    })
                    .catch((error) => {
                        this.secure(error)(error);
                        console.log(error);
                    });
            });
        }
        store.profile = this;
    }
}