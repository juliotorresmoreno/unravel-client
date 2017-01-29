import ServiceBase from '../Lib/ServiceBase';

const like      = "/news/like";
const publicar  = "/news/public";
const consultar = "/news";

export default class Galery extends ServiceBase
{
    constructor(store)
    {
        super();
        this.publicar = (data) => {
            const url = store.getState().config.api + publicar + "?token=" + store.getState().session.token;
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
            const url = store.getState().config.api + like + "?token=" + store.getState().session.token;
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
        this.consultar = (usuario) => {
            const url = store.getState().config.api + consultar + "?token=" + store.getState().session.token;
            return new Promise((resolve, reject) => {
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({news: json.data});
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        };
        this.store = store;
        store.news = this;
    }
}