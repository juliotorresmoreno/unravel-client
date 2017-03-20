import React from 'react';
const { Component } = React;


export default class PublicarCtrl extends Component {
    onHandlerPublicar = (e, obj, permiso) => {
        const store = this.props.store;
        const data = { noticia: this.form.noticia, permiso: permiso };
        const session = this.props.store.location.getSession(this.props.params.user);
        store.news.publicar(data)
            .then(() => {
                this.form = {noticia:''};
                this.props.store.news.consultar(session.usuario);
            });
    }
}