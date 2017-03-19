import React from 'react';
const { Component } = React;

export default class RecoveryCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
    handlerEnviarEmail = (event) => {
        event.preventDefault();
        const store = this.props.store;
        store.auth.recovery(this.form)
            .then(() => {
                
            })
            .catch((error) => {
                if (error.error && error.error.stack) {
                    store.setState({error: error.error.message + "<br/>" + error.error.stack});
                } else {
                    this.setState({error:error.error});
                }
            });
    }
}