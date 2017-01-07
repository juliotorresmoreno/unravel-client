import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import Permisos from '../../Lib/Permisos';
import BasicCtrl from './basic.ctrl';

const sexos = [
    { value: 'M', text: 'Masculino' },
    { value: 'F', text: 'Femenino' },
    { value: 'O', text: 'Otro' }
];

export default class BasicView extends BasicCtrl {
    form = {};
    constructor(args) {
        super(args);
        this.session = (() => {
            if (this.props.params.user && this.props.store.getState().usuario)
                return this.props.store.getState().usuario;
            return this.props.store.getState().session;
        })();
        this.form.nombres = this.session.nombres;
        this.form.apellidos = this.session.apellidos;
        this.form = Object.assign(this.props.store.getState().profile, this.form);
        if(this.form.nacimiento_mes)
            this.showDays();
    }
    render() {
        const session = this.session;
        const name = this.props.store.lang.get('login_name');
        const lastname = this.props.store.lang.get('login_lastname');
        const email = this.props.store.lang.get('login_email');
        const dia = this.props.store.lang.get('profile_nacimiento_dia');
        const mes = this.props.store.lang.get('profile_nacimiento_mes');
        const ano = this.props.store.lang.get('profile_nacimiento_ano');
        const sexo = this.props.store.lang.get('profile_sexo');
        const save = this.props.store.lang.get('app_save');
        const isMe = session !== this.props.store.getState().usuario;
        return (
            <div>
                <div>{this.form.nombres + ' ' + this.form.apellidos}</div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}