import React from 'react';
const { Component } = React;

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

    onScroll = (e, obj) => {
        console.log(e, obj);
    }
}