import React from 'react';
const { Component } = React;


export default class PeticionVideoLlamadaCtrl extends Component {
    onHandlerAceptar = (e, obj) => {
        e.preventDefault();
        var store = this.props.store;
        store.chat.callVideoLlamada(this.props.user.usuario);
    }
    onHandlerRechazar = (e, obj) => {
        e.preventDefault();
        var store = this.props.store;
        store.chat.rechazarvideollamada(this.props.user.usuario);
    }
}