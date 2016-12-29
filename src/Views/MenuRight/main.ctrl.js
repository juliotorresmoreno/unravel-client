import React from 'react';
const { Component } = React;

export default class MenuCtrl extends Component {
    form = {}
    errors = {}
    onRegister = (event) => {
        event.preventDefault();
        this.props.store.auth.register(this.form)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                var errs = error.error.split(";");
                var errors = {};
                for(var i = 0; i < errs.length; i++) {
                    let err = errs[i].split(":");
                    errors[err[0].trim().toLowerCase()] = err[1].trim();
                }
                this.errors = errors;
                console.log(errors);
                this.forceUpdate();
            });
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
}