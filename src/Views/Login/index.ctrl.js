import React from 'react';
const { Component } = React;

export default class LoginCtrl extends Component {
    form = {};
    state = {};
    onLogin = (event) => {
        event.preventDefault();
        const store = this.props.store;
        store.auth.login(this.form)
            .then(() => {
                store.friends.friends();
                setTimeout(() => {
                    store.connection.open(store.getState().session.token);
                }, 100);
            })
            .catch((error) => {
                this.setState({error:error.error});
            });
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}