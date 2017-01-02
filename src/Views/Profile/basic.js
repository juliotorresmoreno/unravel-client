import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import Permisos from '../../Lib/Permisos';
import BasicCtrl from './basic.ctrl';


export default class Basic extends BasicCtrl {
    form = {}
    constructor(args) {
        super(args);
        this.form.nombres = this.props.store.getState().session.nombres;
        this.form.apellidos = this.props.store.getState().session.apellidos;
        this.form.email = this.props.store.getState().perfil.email;
    }
    render() {
        const name = this.props.store.lang.get('login_name');
        const lastname = this.props.store.lang.get('login_lastname');
        const email = this.props.store.lang.get('login_email');
        const dia = this.props.store.lang.get('profile_nacimiento_dia');
        const mes = this.props.store.lang.get('profile_nacimiento_mes');
        const ano = this.props.store.lang.get('profile_nacimiento_ano');
        const sexo = this.props.store.lang.get('profile_sexo');
        const save = this.props.store.lang.get('app_save');

        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Field>
                        <label>{name}</label>
                        <Form.Input 
                            name="nombres"
                            onChange={this.onHandlerChange}
                            value={this.form.nombres}
                            placeholder={name} />
                    </Form.Field>
                    <Form.Field>
                        <label>{lastname}</label>
                        <Form.Input
                            name='apellidos' 
                            onChange={this.onHandlerChange}
                            value={this.form.apellidos}
                            placeholder={lastname} />
                    </Form.Field>
                    <Button primary onClick={this.onHandlerGuardarNombres}>{save}</Button>
                    <br />
                    <br />

                    <Form.Field>
                        <label>{email}</label>
                        <Form.Input
                            name='email' 
                            onChange={this.onHandlerChange}
                            value={this.form.email}
                            placeholder={email} />
                    </Form.Field>
                    <Permisos label={save} onClick={this.onHandlerGuardarEmail} />
                    <br />
                    <br />
                    
                    <Form.Group>
                        <Form.Field>
                            <label>{mes}</label>
                            <Form.Input
                                name='nacimiento_dia' 
                                onChange={this.onHandlerChange}
                                value={this.form.mes}
                                placeholder={mes} />
                        </Form.Field>
                        <Form.Field>
                            <label>{dia}</label>
                            <Form.Input
                                name='nacimiento_mes' 
                                onChange={this.onHandlerChange}
                                value={this.form.dia}
                                placeholder={dia} />
                        </Form.Field>
                    </Form.Group>
                    <Permisos label={save} />
                    <br />
                    <br />

                    <Form.Group>
                        <Form.Field>
                            <label>{ano}</label>
                            <Form.Input
                                name='nacimiento_dia' 
                                onChange={this.onHandlerChange}
                                value={this.form.ano}
                                placeholder={ano} />
                        </Form.Field>
                    </Form.Group>
                    <Permisos label={save} />
                    <br />
                    <br />

                    <Form.Group>
                        <Form.Field>
                            <label>{sexo}</label>
                            <Form.Input
                                name='sexo' 
                                onChange={this.onHandlerChange}
                                value={this.form.sexo}
                                placeholder={sexo} />
                        </Form.Field>
                    </Form.Group>
                    <Permisos label={save} />
                </Form>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}