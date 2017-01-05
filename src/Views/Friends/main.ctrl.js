import React from 'react';
const { Component } = React;

export default class FriendsCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
    onHandlerSearch = (e, obj) => {
        this.props.store.friends.find(obj.formData);
        e.preventDefault();
    }
}