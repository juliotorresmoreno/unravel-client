import ServiceBase from '../Lib/ServiceBase';
const
    consultar = "/chats",
    enviar = "/chats/mensaje",
    videollamada = "/chats/videollamada";

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
                        switch(data.action) {
                            case "mensaje":
                                var usuario = data.usuario === store.getState().session.usuario ? data.usuarioReceptor: data.usuario;
                                if(store.getState().chats === undefined)
                                    store.getState().chats = {};
                                if(store.getState().chats[usuario] === undefined)
                                    store.getState().chats[usuario] = [];
                                store.getState().chats[usuario].push(data);
                                break;
                            case "connect":
                                var friends = store.getState().friends || [];
                                for (let i = 0; i < friends.length; i++) {
                                    if (friends[i].usuario === data.usuario) {
                                        friends[i].conectado = true;
                                        store.setState({friends: true});
                                        break;
                                    }
                                }
                                break;
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
                                store.setState({updateAt: new Date()});
                            } else if (response.data.length > 0 && chat.length > 0) {
                                response.data.reverse();
                                if(chat[0].fecha > response.data[response.data.length - 1].fecha) {
                                    store.getState().chats[params.user] = response.data.concat(chat);
                                    store.setState({updateAt: new Date()});
                                } else if (chat[chat.length - 1].fecha < response.data[0].fecha) {
                                    store.getState().chats[params.user] = chat.concat(response.data);
                                    store.setState({updateAt: new Date()});
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
                var data = { tipo: 'usuario', usuario: user };
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