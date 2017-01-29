import React from 'react';
const { Component } = React;

export default class PublicacionCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this[obj.name] = obj.value;
        this.forceUpdate();
    }
    onHandlerKeyPress = (e, obj) => {
        if (e.key !== "Enter")
            return;
        const noticia = this.props.noticia || {};
        const store = this.props.store;
        const data = { noticia: noticia.ID, comentario: this.comentario };
        store.news.comentar(data);
    }
    onHandlerLike = (e, obj) => {
        const noticia = this.props.noticia || {};
        const store = this.props.store;
        const data = { noticia: noticia.ID };
        store.news.like(data);
    }
    onHandlerReply = (e, obj) => {
        const noticia = this.props.noticia || {};
        this.comentario = noticia.nombres + " " + noticia.apellidos + ": ";
        this.forceUpdate();
    }
}