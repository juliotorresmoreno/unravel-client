import React from 'react';
const { Component } = React;

export default class MisGruposCtrl extends Component {
    handlerGo = (e, obj) => {
        e.preventDefault();
        var href = e.target.href;
        var url = href.replace(/^http(s){0,1}:\/\/[^/]*/, "");
        this.props.router.push(url);
    }
    handlerCreate = (e, obj) => {
        this.props.router.push('/groups/create');
    }
}