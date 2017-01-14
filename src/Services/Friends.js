import ServiceBase from '../Lib/ServiceBase';

const consultaFriends = '/friends';
const consulta = '/users';
const agregar = '/friends/add';

export default class Friends extends ServiceBase
{
    constructor(store)
    {
        super();
        this.getUser = (usuario) => 
        {
            return new Promise((resolve, reject) => {
                if (Array.isArray(store.getState().friends))
                {
                    for(let i = 0; i < store.getState().friends.length; i++)
                    {
                        if(store.getState().friends[i].usuario === usuario)
                        {
                            store.setState({usuario: store.getState().friends[i]});
                            this.secure(resolve)(store.getState().friends[i]);
                            return;
                        }
                    }
                } 
                const url = store.getState().config.api + consulta;
                this.get(url + "?u=" + encodeURI(usuario) + "&token=" + store.getState().session.token)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                if (json.data.length === 1)
                                {
                                    store.setState({usuario: json.data[0]});
                                }
                                else
                                {
                                    store.setState({usuario: {
                                        usuario: usuario,
                                        nombres: "Usuario",
                                        apellidos: "inexistente"
                                    }});
                                }
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => this.secure(reject)(error));
                    })
                    .catch((error) => this.secure(error)(error));
            });
        };

        this.add = (user) =>
        {
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + agregar;
                this.put(url + "?token=" + store.getState().session.token, {user: user})
                    .then((response) => {
                        
                    })
                    .catch((error) => this.secure(error)(error));
            });
        };
        this.friends = (data) => 
        {
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + consultaFriends;
                const query = data && data.query ? "?q=" + encodeURI(data.query): "?";
                this.get(url + query + "&token=" + store.getState().session.token)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({friends: json.data});
                                response.ok ?
                                    this.secure(resolve)({response: response, data: json}):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => {
                                response.ok ?
                                    this.secure(resolve)({response: response}):
                                    this.secure(reject)({error: error});
                            });
                    })
                    .catch((error) => this.secure(error)(error));
            });
        };
        this.find = (data) => 
        {
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + consulta;
                const query = data && data.query ? "?q=" + encodeURI(data.query): "?";
                this.get(url + query + "&token=" + store.getState().session.token)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({friends: json.data});
                                response.ok ?
                                    this.secure(resolve)({response: response, data: json}):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => {
                                response.ok ?
                                    this.secure(resolve)({response: response}):
                                    this.secure(reject)({error: error});
                            });
                    })
                    .catch((error) => this.secure(error)(error));
            });
        };
        store.friends = this;
    }
}