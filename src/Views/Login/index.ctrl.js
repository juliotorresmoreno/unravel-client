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
                store.connection.open(true);
            })
            .catch((error) => {
                if (error.error && error.error.stack) {
                    store.setState({error: error.error.message + "<br/>" + error.error.stack});
                } else {
                    this.setState({error: error.error});
                }
            });
    }
    authFacebook = () => {
        window.location.href = "/auth/facebook";
    }
    authGoogle = () => {
        window.location.href = "/auth/google";
    }
    authGithub = () => {
        window.location.href = "/auth/github";
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}
