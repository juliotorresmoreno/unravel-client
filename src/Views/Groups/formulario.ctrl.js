import React from 'react';
const { Component } = React;

export default class FormularioCtrl extends Component {
    onHandlerGuardar = (e, obj, permiso) => {
        var store = this.props.store;
        var data = this.form;
        data.permiso = permiso;
        store.groups.save(data)
            .then(e => this.props.router.push('/groups'));
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}