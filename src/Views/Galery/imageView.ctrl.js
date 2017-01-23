import React from 'react';
const { Component } = React;

export default class ImageViewCtrl extends Component {
    handleSubir = (e, obj) => {
        this.editar = true;
        this.forceUpdate();
    }
    handleEstablecer = (e, obj) => {
        this.editar = true;
        this.forceUpdate();
    }
    handleCancelar = (e, obj) => {
        this.editar = false;
        this.forceUpdate();
    }
    handlerUpload = (e, image) => {
        
    }
}