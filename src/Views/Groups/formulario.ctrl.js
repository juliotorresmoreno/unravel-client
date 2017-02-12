import React from 'react';
const { Component } = React;
const file = document.createElement("input");
file.type = "file";
file.accept = ".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*";
file.multiple = true;

export default class FormularioCtrl extends Component {
    onHandlerGuardar = (e, obj, permiso) => {
        var store = this.props.store;
        var data = this.form;
        data.permiso = permiso;
        store.groups.save(data)
            .then(e => this.props.router.push('/groups'))
            .catch((error) => {
                store.setState({error: error});
            });
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
    onHandlerImagen = (e, obj) => {
        e.preventDefault();
        file.click();
    }
}