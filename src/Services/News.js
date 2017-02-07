import ServiceBase from '../Lib/ServiceBase';

const like      = "/news/like";
const publicar  = "/news/public";
const comentar  = "/news/comentar";
const consultar = "/news";

export default class Galery extends ServiceBase
{
    constructor(store)
    {
        super();
        this.comentar = (data) => {
            const url = store.getState().config.api + comentar;
            return new Promise((resolve, reject) => {
                this.post(url, data)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                for(let i = 0; i < store.getState().news.data.length; i++) {
                                    if (store.getState().news.data[i].ID === json.data.ID) {
                                        store.getState().news.data[i].comentarios = json.data.comentarios;
                                        break;
                                    }
                                }
                                store.setState({news: true});
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        };
        this.publicar = (data) => {
            const url = store.getState().config.api + publicar;
            return new Promise((resolve, reject) => {
                this.post(url, data)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        };
        this.like = (data) => {
            const url = store.getState().config.api + like;
            return new Promise((resolve, reject) => {
                this.post(url, data)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                for(let i = 0; i < store.getState().news.data.length; i++) {
                                    if (store.getState().news.data[i].ID === json.data.ID) {
                                        store.getState().news.data[i].likes = json.data.likes;
                                        break;
                                    }
                                }
                                store.setState({news: true});
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        };
        this.consultar = (data = {}) => {
            var usuario = data.usuario || store.getState().session.usuario;
            var url = store.getState().config.api + (data.usuario ? "/" + data.usuario: '') + consultar;
            url+= data.antesDe ? "?antesDe=" + data.antesDe: "";
            return new Promise((resolve, reject) => {
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                var noticias = store.getState().news;
                                if (noticias === undefined || noticias.usuario !== usuario || !data.antesDe) {
                                    store.setState({ news: { usuario: usuario, data: json.data } });
                                } else {
                                    var news = store.getState().news.data.concat(json.data);
                                    store.setState({ news: { usuario: usuario, data: news } });
                                }
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => {
                                console.log(error);
                                //this.secure(reject)(error)
                            })
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        };
        this.store = store;
        store.news = this;
    }
}