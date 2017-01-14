import React from 'react';
const { Component } = React;

export default class ChatCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}