import React from 'react';
const {Component} = React;


export default class tomarFoto extends Component {
    handlerTomarFoto = () => {
        var captura = this.refs.webcam.getScreenshot();
        this.captura = captura;
        var canvas = this.refs.webcam.getCanvas();
        canvas.toBlob((data) => {
            this.capturaBlob = data;
        });
        this.forceUpdate();
    }
    handlerSubir = () => {
        const
            params = this.props.params || {},
            galery = params.galery;
        var data = new FormData();
        data.append("name", "foto");
        data.append("file", this.capturaBlob);
        data.append("galery", galery);
        this.props.store.galery.uploadFoto(data)
            .then(() => this.props.router.push("/galery/" + galery));
    }
    handlerCancelar = () => {
        const
            params = this.props.params || {},
            galery = params.galery;
        this.props.router.push("/galery/" + galery);
    }
}