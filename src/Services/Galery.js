import ServiceBase from '../Lib/ServiceBase';

const create = "/galery/create";
const uploadFoto = "/galery/upload";

export default class Galery extends ServiceBase
{
    constructor(store)
    {
        super();
        this.create = (data) => {
            const url = store.getState().config.api + create + "?token=" + store.getState().session.token;
            return new Promise((resolve, reject) => {
                this.post(url, data)
                    .then((response) => {
                        response.json()
                            .then((json) => 
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json)
                            )
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error))
            });
        };
        this.uploadFoto = (data) => {
            const url = store.getState().config.api + uploadFoto + "?token=" + store.getState().session.token;
            return new Promise((resolve, reject) => {
                this.upload(url, data)
                    .then((response) => {
                        response.json()
                            .then((json) => 
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json)
                            )
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        }
        store.galery = this;
    }
}