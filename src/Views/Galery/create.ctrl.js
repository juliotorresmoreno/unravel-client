import React from 'react';
const { Component } = React;

export default class CreateCtrl extends Component {
    onHandlerGuardarGaleria = (e, obj, permiso) => {
        this.form.permiso = permiso;
        this.props.store.galery.create(this.form)
            .then((response) => {
                this.props.router.push('/galery/' + encodeURI(this.form.nombre));
            });
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}