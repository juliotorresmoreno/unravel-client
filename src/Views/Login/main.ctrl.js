import React from 'react';
const { Component } = React;

export default class LoginCtrl extends Component {
    form = {};
    state = {};
    onLogin = (event) => {
        event.preventDefault();
        this.props.store.auth.login(this.form)
            .catch((error) => {
                this.setState({error:error.error});
            });
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}