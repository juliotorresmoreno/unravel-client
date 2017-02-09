import React from 'react';
const { Component } = React;

export default class GrupoCtrl extends Component {
    onHandlerGuardar = (e, obj, permiso) => {
        alert("sdfsfd");
        var store = this.props.store;
        var data = this.form;
        data.permiso = permiso;
        store.groups.save(data);
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}