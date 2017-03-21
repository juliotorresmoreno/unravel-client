import ServiceBase from '../Lib/ServiceBase';

const consultaFriends = '/friends';
const consulta = '/users';
const agregar = '/friends/add';
const rechazar = '/friends/reject';

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
                this.get(url + "?u=" + encodeURI(usuario))
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
                    .catch((error) => this.secure(reject)(error));
            });
        };
        
        const actualizarEstado = (user, relacion, detail) => {
            if (store.getState().usuario.usuario === user) {
                store.getState().usuario.estado = relacion;
                store.getState().usuario.relacion = detail;
            }
            if (Array.isArray(store.getState().friends)) {
                for (let i = 0; i < store.getState().friends; i++)
                    if (store.getState().friends[i].usuario === user) {
                        store.getState().friends[i].estado = relacion;
                        store.getState().friends[i].relacion = detail;
                    }
            }
            if (Array.isArray(store.getState().people)) {
                for (let i = 0; i < store.getState().people; i++)
                    if (store.getState().people[i].usuario === user) {
                        store.getState().people[i].estado = relacion;
                        store.getState().friends[i].relacion = detail;
                    }
            }
            store.setState({friends: true, usuario: true});
        };

        this.reject = (user) =>
        {
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + rechazar;
                this.delete(url, {user: user})
                    .then((response) => {
                        if (response.ok) actualizarEstado(user, "Desconocido");
                        response.json()
                            .then((json) => {
                                return response.ok ? 
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                        })
                        .catch((error) => this.secure(reject)(error));
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        }

        this.add = (user) =>
        {
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + agregar;
                this.put(url, {user: user})
                    .then((response) => {
                        if (response.ok) {
                            response.json()
                                .then((json) => actualizarEstado(user, json.estado, json.relacion))
                                .catch((error) => this.secure(reject)(error));
                            return;
                        }
                        this.secure(reject)();
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        };
        this.friends = (data = {}) => 
        {
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + consultaFriends;
                const query = data && data.query ? "?q=" + encodeURI(data.query): "";
                this.get(url + query)
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
                    .catch((error) => this.secure(reject)(error));
            });
        };
        this.friendsByUser = (data = {}) => 
        {
            const user = data && data.user !== undefined ? "/" + data.user: "";
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + consultaFriends + user;
                const query = data && data.query ? "?q=" + encodeURI(data.query): "";
                this.get(url + query)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({usuarios: json.data});
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
                    .catch((error) => this.secure(reject)(error));
            });
        };
        this.find = (data) => 
        {
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + consulta;
                const query = data && data.query ? "?q=" + encodeURI(data.query): "";
                this.get(url + query)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({people: json.data});
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
                    .catch((error) => this.secure(reject)(error));
            });
        };
        store.friends = this;
    }
}