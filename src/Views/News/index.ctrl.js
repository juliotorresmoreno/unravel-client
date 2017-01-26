import React from 'react';
const { Component } = React;

export default class NewsCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
    onHandlerPublicar = (e, obj, permiso) => {
        const store = this.props.store;
        const session = this.getSession();
        store.news.publicar({
            usuario: session.usuario,
            noticia: this.form.noticia,
            permiso: permiso
        });
    }
}