import React from 'react';
const { Component } = React;

export default class MisGruposCtrl extends Component {
    handlerCreate = (e, obj) => {
        this.props.router.push('/groups/create');
    }
}