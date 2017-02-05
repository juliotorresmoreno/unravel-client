import React from 'react';
const { Component } = React;

var consultable = false;

export default class ChatCtrl extends Component {
    onHandlerEnviar = (e, obj) => {
        this.props.store.chat.mensaje(this.props.params.user, this.form.mensaje)
            .then(() => {
                this.form.mensaje = "";
                this.forceUpdate();
            });
    }
    onHandlerKeyPressEnviar = (e, obj) => {
        if (e.key === "Enter")
            this.onHandlerEnviar(e, obj);
    }
    onHandlerTextoChange = (e) => {
        this.form.mensaje = e.target.value;
        this.forceUpdate();
    }
    onHandlerVideollamada = (e) => {
        this.props.store.chat.videollamada(this.props.params.user);
    }
    onHandlerLlamada = (e) => {
    }
    onScroll = (e, obj) => {
        if(e.target.scrollTop === 0 && consultable) {
            const chats = this.props.store.getState().chats[this.props.params.user] || [];
            const fecha = chats[0].fecha || '';
            this.props.store.chat.consultar({user: this.props.params.user, antesDe: fecha});
            consultable = false;
        }
    }
    onMouseDown = (e, obj) => {
        consultable = true;
    }
}