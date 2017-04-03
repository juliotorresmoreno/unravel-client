import ServiceBase from '../Lib/ServiceBase';
const
    consultar = "/chats",
    enviar = "/chats/mensaje",
    videollamada = "/chats/videollamada",
    rechazarvideollamada = "/chats/rechazarvideollamada";

export default class Chat extends ServiceBase
{
    secure = function(fn) {
        if(typeof fn !== 'function') {
            return () => {};
        }
        return fn;
    }
    constructor(store) {
        super();
        store.getState().chats = {};
        store.subscribe({
            setState: () => {},
            forceUpdate: () => {},
            mounted: true,
            Midlewares: [
                (store, {wss}) => {
                    if (typeof wss !== "object")
                        return;
                    var { type, data } = wss;
                    if (type === "message") {
                        var usuario = "";
                        switch(data.action) {
                            case "rechazarvideollamada":
                                usuario = data.usuario === store.getState().session.usuario ? data.usuarioReceptor: data.usuario;
                                if(store.getState().chats === undefined)
                                    store.getState().chats = {};
                                if(store.getState().chats[usuario] === undefined)
                                    store.getState().chats[usuario] = [];
                                for(let i = 0; i < store.getState().chats[usuario].length; i++)
                                    if (store.getState().chats[usuario][i].action === "videollamada")
                                        store.getState().chats[usuario][i].estado = "rechazada";
                                break;
                            case "amistad":
                                store.friends.friends();
                                break;
                            case "videollamada": case "llamada":
                            case "mensaje":
                                if (data.action === "videollamada" || data.action === "llamada") {
                                    if (data.tipo === "confirmacion") {
                                        store.getState().usuario.videollamada = true;
                                        store.setState({chats: true});
                                        break;
                                    }
                                }
                                var session = store.getState().session;
                                usuario = data.usuario === session.usuario ? data.usuarioReceptor: data.usuario;
                                if(store.getState().chats === undefined)
                                    store.getState().chats = {};
                                if(store.getState().chats[usuario] === undefined)
                                    store.getState().chats[usuario] = [];
                                store.getState().chats[usuario].push(data);
                                var user = store.getState().usuario;
                                if ((user === undefined || user.usuario !== usuario) && store.getState().friends !== undefined) {
                                    for (var i = 0; i < store.getState().friends.length; i++) {
                                        if (store.getState().friends[i].usuario === usuario) {
                                            store.getState().friends[i].chat = true;
                                            store.setState({friends: store.getState().friends});
                                            console.log("sds");
                                            break;
                                        }
                                    }
                                }
                                break;
                            case "connect": case "disconnect":
                                var friends = store.getState().friends || [];
                                var conectado = data.action === "connect";
                                if (store.getState().usuario && store.getState().usuario.usuario === data.usuario)
                                    store.getState().usuario.conectado = conectado;
                                for (let i = 0; i < friends.length; i++)
                                    if (friends[i].usuario === data.usuario) {
                                        friends[i].conectado = conectado;
                                        store.setState({friends: true, usuario: true});
                                        break;
                                    }
                                break;
                            default:
                        }
                    }
                }
            ]
        }, ['wss'], "ServiceChat");
        this.consultar = function(params) {
            return new Promise((resolve, reject) => {
                var url = store.getState().config.api + consultar + '/' + params.user + "?"
                                + (params.antesDe ? "antesDe=" + encodeURI(params.antesDe) + "&": "")
                                + (params.despuesDe ? "despuesDe=" + encodeURI(params.despuesDe) + "&": "");
                this.get(url)
                    .then((response) => response.json())
                    .then((response) => {
                        if(response.success) {
                            if(store.getState().chat === undefined)
                                store.getState().chat = {};
                            let chat = store.getState().chats[params.user];
                            if(!chat) {
                                store.getState().chats[params.user] = response.data;
                                store.getState().chats[params.user].reverse();
                                store.setState({chats: true});
                            } else if (response.data.length > 0 && chat.length > 0) {
                                response.data.reverse();
                                if(chat[0].fecha > response.data[response.data.length - 1].fecha) {
                                    store.getState().chats[params.user] = response.data.concat(chat);
                                    store.setState({chats: true});
                                } else if (chat[chat.length - 1].fecha < response.data[0].fecha) {
                                    store.getState().chats[params.user] = chat.concat(response.data);
                                    store.setState({chats: true});
                                }
                            }
                            this.secure(resolve)(response);
                        } else {
                            this.secure(reject)(response);
                        }
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        }.bind(this);
        this.callVideoLlamada = function(user) {
            if (!store.getState().usuario || store.getState().usuario.usuario !== user) {
                return;
            }
            return new Promise((resolve, reject) => {
                var url = store.getState().config.api + videollamada;
                var data = { tipo: 'confirmacion', usuario: user };
                this.post(url, data)
                    .then((response) => response.json())
                    .then((response) => {
                        if(response.success) {
                            store.getState().usuario.videollamada = true;
                            store.setState({chats: true});
                            this.secure(resolve)(response);
                        } else {
                            this.secure(reject)(response);
                        }
                    })
                    .catch((error) => {
                        this.secure(reject)(error);
                    });
            });
        };
        this.mensaje = function(user, mensaje) {
            return new Promise((resolve, reject) => {
                var url = store.getState().config.api + enviar;
                var data = { tipo: 'usuario', usuario: user, mensaje: mensaje };
                this.post(url, data)
                    .then((response) => response.json())
                    .then((response) => {
                        if(response.success) {
                            this.secure(resolve)(response);
                        } else {
                            this.secure(reject)(response);
                        }
                    })
                    .catch((error) => {
                        this.secure(reject)(error);
                    });
            });
        }.bind(this);
        this.videollamada = function(user) {
            return new Promise((resolve, reject) => {
                var url = store.getState().config.api + videollamada;
                var data = { tipo: 'peticion', usuario: user };
                this.post(url, data)
                    .then((response) => response.json())
                    .then((response) => {
                        if(response.success) {
                            this.secure(resolve)(response);
                        } else {
                            this.secure(reject)(response);
                        }
                    })
                    .catch((error) => {
                        this.secure(reject)(error);
                    });
            });
        }.bind(this);
        this.rechazarvideollamada = function(user) {
            return new Promise((resolve, reject) => {
                var url = store.getState().config.api + rechazarvideollamada;
                var data = { usuario: user };
                this.post(url, data)
                    .then((response) => response.json())
                    .then((response) => {
                        if(response.success) {
                            this.secure(resolve)(response);
                        } else {
                            this.secure(reject)(response);
                        }
                    })
                    .catch((error) => {
                        this.secure(reject)(error);
                    });
            });
        }.bind(this);
        store.chat = this;
    }
}