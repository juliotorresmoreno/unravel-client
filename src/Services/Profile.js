import ServiceBase from '../Lib/ServiceBase';

const register = '/profile';
const consulta = '/profile';


export default class Profile extends ServiceBase
{
    constructor(store)
    {
        super();
        this.update = (data) => {
            const url = store.getState().config.api + register + "?token=" + store.getState().session.token;;
            return new Promise((resolve, reject) => {
                this.put(url, data)
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
        this.load = (usuario) => {
            const url = store.getState().config.api + 
                            consulta + (usuario ? '/' + usuario: '') + 
                            "?token=" + store.getState().session.token;;
            return new Promise((resolve, reject) => {
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({profile: json.data});
                                response.ok ?
                                    this.secure(resolve)({response: response, data: json.data}):
                                    this.secure(reject)(json.data);
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