import ServiceBase from '../Lib/ServiceBase';

const register = '/profile';
const consulta = '/profile';


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
                    });
            });
        };
        this.load = () => {
            const url = store.getState().config.api + consulta;
            return new Promise((resolve, reject) => {
                this.get(url + "?token=" + store.getState().session.token)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({profile: json});
                                response.ok ?
                                    this.secure(resolve)({response: response,data: json}):
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
                    });
            })
        }
        store.getState().profile = {};
        store.profile = this;
    }
}