import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import Permisos from '../../Lib/Permisos';
import BasicCtrl from './basic.ctrl';

const meses = [
    { value: '01', text: 'Enero' },
    { value: '02', text: 'Febrero' },
    { value: '03', text: 'Marzo' },
    { value: '04', text: 'Abril' },
    { value: '05', text: 'Mayo' },
    { value: '06', text: 'Junio' },

    { value: '07', text: 'Julio' },
    { value: '08', text: 'Agosto' },
    { value: '09', text: 'Septiembre' },
    { value: '10', text: 'Octubre' },
    { value: '11', text: 'Novienbre' },
    { value: '12', text: 'Diciembre' }
];

const anos = [];
const year = new Date().getFullYear();
for(var i = year - 10; i >= year - 100; i--)
{
    anos.push({value: i + '', text: i});
}

const sexos = [
    { value: 'M', text: 'Masculino' },
    { value: 'F', text: 'Femenino' },
    { value: 'O', text: 'Otro' }
];

export default class Basic extends BasicCtrl {
    dias_disponibles = [];
    form = {}
    constructor(args) {
        super(args);
        this.form.nombres = this.props.store.getState().session.nombres;
        this.form.apellidos = this.props.store.getState().session.apellidos;
        this.form.email = this.props.store.getState().profile.email;
        this.form.nacimiento_mes = this.props.store.getState().profile.nacimiento_mes;
        if(this.form.nacimiento_mes)
            this.showDays();
        this.form.nacimiento_dia = this.props.store.getState().profile.nacimiento_dia;
        this.form.nacimiento_ano = this.props.store.getState().profile.nacimiento_ano;
        this.form.sexo = this.props.store.getState().profile.sexo;
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
                    <Permisos label={save} onClick={this.onHandlerGuardarEmail}
                        permiso={this.props.store.getState().profile.permiso_email} />
                    <br />
                    <br />
                    
                    <Form.Group>
                        <Form.Field>
                            <label>{mes}</label>
                            <Form.Select 
                                name='nacimiento_mes'
                                options={meses}
                                value={this.form.nacimiento_mes}
                                placeholder={mes}
                                onChange={this.onHandlerChangeMes} />
                        </Form.Field>
                        <Form.Field>
                            <label>{dia}</label>
                            <Form.Select 
                                name='nacimiento_dia' 
                                options={this.dias_disponibles}
                                onChange={this.onHandlerChange}
                                value={this.form.nacimiento_dia}
                                placeholder={dia} />
                        </Form.Field>
                    </Form.Group>
                    <Permisos label={save} onClick={this.onHandlerGuardarMesDia}
                        permiso={this.props.store.getState().profile.permiso_nacimiento_dia} />
                    <br />
                    <br />

                    <Form.Group>
                        <Form.Field>
                            <label>{ano}</label>
                            <Form.Select 
                                name='nacimiento_ano' 
                                options={anos}
                                onChange={this.onHandlerChangeMes}
                                value={this.form.nacimiento_ano}
                                placeholder={ano} />
                        </Form.Field>
                    </Form.Group>
                    <Permisos label={save} onClick={this.onHandlerGuardarAno}
                        permiso={this.props.store.getState().profile.permiso_nacimiento_ano} />
                    <br />
                    <br />

                    <Form.Group>
                        <Form.Field>
                            <label>{sexo}</label>
                            <Form.Select 
                                name='sexo'
                                options={sexos}
                                onChange={this.onHandlerChange}
                                value={this.form.sexo}
                                placeholder={sexo} />
                        </Form.Field>
                    </Form.Group>
                    <Permisos label={save} onClick={this.onHandlerGuardarSexo}
                        permiso={this.props.store.getState().profile.permiso_sexo} />
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