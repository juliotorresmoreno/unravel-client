import React from 'react';
const { Component } = React;


export default class NewsCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
    onHandlerMore = (e, obj) => {
        e.preventDefault();
        const store = this.props.store;
        const news = this.getNews();
        const session = this.props.store.location.getSession(this.props.params.user);
        var antesDe;
        if (this.props.router.routes.length === 1) {
            if (news.length > 0) {
                antesDe = news[news.length - 1].create_at;
                store.news.consultar({usuario: session.usuario, antesDe: antesDe});
                return;
            }
            store.news.consultar({usuario: session.usuario});
            return;
        }
        if (news.length > 0) {
            antesDe = news[news.length - 1].create_at;
            store.news.consultar({antesDe: antesDe});
            return;
        }
        store.news.consultar();
    }
}