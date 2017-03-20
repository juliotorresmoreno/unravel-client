import React from 'react';
const { Component } = React;

export default class RecuperarCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
    handlerCambiarContrasena = (event) => {
        event.preventDefault();
        this.props.store.auth.changePassword(this.form)
            .then((result) => {
                location.href = "/";
            })
            .catch((error) => {
                var errs = error.error.split(";");
                var errors = {};
                for(var i = 0; i < errs.length; i++) {
                    let err = errs[i].split(":");
                    errors[err[0].trim().toLowerCase()] = err[1].trim();
                }
                this.errors = errors;
                this.forceUpdate();
            });
    }
}