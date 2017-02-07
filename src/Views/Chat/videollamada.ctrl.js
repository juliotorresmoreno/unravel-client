import React from 'react';
const { Component } = React;


export default class VideoLlamadaCtrl extends Component {
    onHandlerAceptar = (e, obj) => {

    }
    onHandlerRechazar = (e, obj) => {
        e.preventDefault();
        var store = this.props.store;
        store.chat.rechazarvideollamada(this.props.store.getState().usuario.usuario);
    }
}