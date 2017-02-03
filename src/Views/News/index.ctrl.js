import React from 'react';
const { Component } = React;


export default class NewsCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
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
    onHandlerMore = (e, obj) => {
        const store = this.props.store;
        const news = this.getNews();
        const session = this.props.store.location.getSession(this.props.params.user);
        if (news.length > 0) {
            var antesDe = news[news.length - 1].create_at;
            store.news.consultar({usuario: session.usuario, antesDe: antesDe});
            return;
        }
        store.news.consultar({usuario: session.usuario});
    }
}