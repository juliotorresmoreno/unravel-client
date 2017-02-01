import ServiceBase from '../Lib/ServiceBase';

const save = "/galery";
const describe = "/galery";
const listarGalerias = "/galery";
const listarImagenes = "/galery";
const uploadFoto = "/galery/upload";
const fotoPerfil = "/galery/fotoPerfil";

export default class Galery extends ServiceBase
{
    constructor(store)
    {
        super();
        this.save = (data) => {
            const token = store.getState().session.token;
            const url = store.getState().config.api + save + "?token=" + token;
            return new Promise((resolve, reject) => {
                this.post(url, data)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json.error)
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error))
            });
        };
        this.describe = (galery) => {
            console.log("describe");
            const token = store.getState().session.token;
            const url = store.getState().config.api + describe + "/" + galery + "/describe?token=" + token;
            return new Promise((resolve, reject) => {
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({galeria: json.data});
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                                }
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
            console.log("establecerFotoPerfil");
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
            console.log("getGalerys");
            const token = store.getState().session.token;
            const url = store.getState().config.api +
                        (usuario !== undefined ? "/" + usuario: "") +
                        listarGalerias + 
                        "?token=" + token;
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
        this.getImages = (usuario, galery, reload = true) => {
            console.log("getImages");
            const token = store.getState().session.token;
            const url = store.getState().config.api
                        + (usuario !== undefined ? "/" + usuario: "") 
                        + listarImagenes + "/" + galery
                        + "?token=" + token;
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