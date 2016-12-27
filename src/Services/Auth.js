import ServiceBase from '../Lib/ServiceBase';

const register = '/auth/registrar';
const login    = '/auth/login';
const session  = '/auth/session';

export default class Auth extends ServiceBase
{
    constructor(store)
    {
        super();
        const resolve = (url, data) => {
            return (resolve, reject) => {
                (() =>  data !== undefined ? this.post(url, data): fetch(url))()
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                if(response.ok)
                                {
                                    store.setState({session: json});
                                    this.secure(resolve)({
                                        response: response,
                                        data: json
                                    });
                                }
                                else
                                {
                                    this.secure(reject)(json);
                                }
                            })
                            .catch((error) => {
                                console.log("yea", error);
                                this.secure(reject)({error: error});
                            });
                    })
                    .catch((error) => {
                        this.secure(reject)(error);
                    });
            };
        }
        this.register = (data) => 
        {
            return new Promise(resolve(store.getState().config.api + register, data));
        };
        this.login = (data) => 
        {
            return new Promise(resolve(store.getState().config.api + login, data));
        };
        this.getSession = () => {
            return new Promise(resolve(store.getState().config.api + session));
        };
        store.auth = this;
    }
}