import React from 'react';
const { Component } = React;

export default class ImageViewCtrl extends Component {
    handleEstablecer = (e, obj) => {
        this.editar = true;
        this.forceUpdate();
    }
    handleCancelar = (e, obj) => {
        this.editar = false;
        this.forceUpdate();
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}