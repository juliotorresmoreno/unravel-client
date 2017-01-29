import React from 'react';
const { Component } = React;

export default class ComentarioCtrl extends Component {
    onHandlerLike = (noticia) => (e, obj) => {
        const store = this.props.store;
        const data = { noticia: noticia.ID };
        store.news.like(data);
    }
}