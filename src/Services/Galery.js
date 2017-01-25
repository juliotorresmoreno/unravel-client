import ServiceBase from '../Lib/ServiceBase';

const create = "/galery/create";
const listarGalerias = "/galery";
const listarImagenes = "/galery";
const uploadFoto = "/galery/upload";
const fotoPerfil = "/galery/fotoPerfil";

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
        this.establecerFotoPerfil = (data) => {
            const url = store.getState().config.api + fotoPerfil + "?token=" + store.getState().session.token;
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
        this.getGalerys = (usuario) => {
            const url = store.getState().config.api + "/" + usuario +
                        listarGalerias + 
                        "?token=" + store.getState().session.token;
            return new Promise((resolve, reject) => {
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                if (response.ok)
                                    store.setState({galerys: json.data});
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json)
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        }
        this.getImages = (galery, reload = true) => {
            const url = store.getState().config.api + 
                        listarImagenes + "/" + galery + 
                        "?token=" + store.getState().session.token;
            return new Promise((resolve, reject) => {
                const images = store.getState().images;
                if (reload === false && images && images.galery === galery) {
                    this.secure(resolve)(images.items);
                    return;
                }
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                if (response.ok)
                                    store.setState({images: {galery: galery, items: json.data}});
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
        store.galery = this;
    }
}