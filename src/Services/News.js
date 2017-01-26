import ServiceBase from '../Lib/ServiceBase';

const publicar = "/news/public";

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
                                    this.secure(reject)(json)
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        }
        this.store = store;
        store.news = this;
    }
}