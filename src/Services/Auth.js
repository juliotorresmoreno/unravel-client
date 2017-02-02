import ServiceBase from '../Lib/ServiceBase';

const register = '/auth/registrar';
const login    = '/auth/login';
const logout   = '/auth/logout';
const session  = '/auth/session';

export default class Auth extends ServiceBase
{
    constructor(store)
    {
        super();
        const resolve = (url, data) => {
            return (resolve, reject) => {
                (() => data !== undefined ? this.post(url, data): this.get(url))()
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                if(response.ok)
                                {
                                    store.setState({session: json.session});
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
            return new Promise((resolve, reject) => {
                this.get(store.getState().config.api + session)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({session: json.session});
                                this.secure(resolve)({session: json});
                            })
                            .catch((error) => {
                                this.secure(reject)({error: error});
                            });
                    })
                    .catch((error) => {
                        this.secure(reject)({error: error});
                    });
            });
        };
        this.fullName = () => {
            return store.getState().session ? store.getState().session.nombres + ' ' + store.getState().session.apellidos: '';
        }
        this.logout = () => 
        {
            return new Promise((resolve, reject) => {
                this.get(store.getState().config.api + logout)
                    .then((response) => {
                        if(response.ok)
                        {
                            store.setState({session: false});
                            this.secure(resolve)({response: response});
                        }
                    })
                    .catch((error) => {
                        this.secure(reject)(error);
                    })
            });
        };
        store.auth = this;
    }
}