import React from 'react';
const { Component } = React;

export default class FormularioCtrl extends Component {
    onHandlerGuardarGaleria = (e, obj, permiso) => {
        const store = this.props.store;
        const router = this.props.router;
        this.form.permiso = permiso;
        store.galery.save(this.form)
            .then((response) => router.push('/galery/' + encodeURI(response.galeria)))
            .catch((error) => store.setState({error: error}));
    }
    onHandlerCancelar = (e, obj) => {
        if (this.form.ID === undefined)
            this.props.router.push('/galery');
        else
            this.props.router.push('/galery/' + this.form.ID);
        e.preventDefault();
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}