import React from 'react';
const { Component } = React;

export default class TodosGruposCtrl extends Component {
    onHandlerSearch = (e, obj) => {
        e.preventDefault();
        const {store} = this.props;
        store.groups.consultarTodos(this.form);
    }
    handlerGo = (e, obj) => {
        e.preventDefault();
        var href = e.target.href;
        var url = href.replace(/^http(s){0,1}:\/\/[^/]*/, "");
        this.props.router.push(url);
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}