import React from 'react';
const { Component } = React;

export default class ViewCtrl extends Component {
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
    handleSeleccionar = (e, obj) => {
        this.file.click();
    }
    handleSubir = (e, obj) => {
        const params = this.props.params || {};
        const galery = params.galery;
        for(let i = 0; i < this.files.length; i++) {
            var data = new FormData();
            data.append("name", this.files[i].name);
            data.append("file", this.file.files[i]);
            data.append("galery", galery);
            this.props.store.galery.uploadFoto(data);
        }
    }
}