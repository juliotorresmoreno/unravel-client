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
                    var { type, data, error } = wss;
                    switch(type) {
                        case "message":
                            var usuario = data.usuario === store.getState().session.usuario ? data.usuarioReceptor: data.usuario;
                            if(store.getState().chats === undefined)
                                store.getState().chats = {};
                            if(store.getState().chats[usuario] === undefined)
                                store.getState().chats[usuario] = [];
                            store.getState().chats[usuario].push(data);
                            break;
                        case "error":
                            console.log(error);
                            break;
                        default:
                    }
                }
            ]
        }, ['wss'], "ServiceChat");
        this.consultar = function(params) {
            return new Promise((resolve, reject) => {
                var url = store.getState().config.api + consultar + '/' + params.user + "?token=" + store.getState().session.token;;
                this.get(url)
                    .then((response) => response.json())
                    .then((response) => {
                        if(response.success) {
                            if(store.getState().chat === undefined)
                                store.getState().chat = {};
                            store.getState().chats[params.user] = response.data;
                            store.setState({updateAt: new Date()});
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
                var url = store.getState().config.api + enviar + "?token=" + store.getState().session.token;
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