import React from 'react';

import { Form } from 'semantic-ui-react';

import Permisos from '../../Lib/Permisos';
import ContactCtrl from './contact.ctrl';


export default class Contact extends ContactCtrl {
    form = {}
    render() {
        const pais_nacimiento = this.props.store.lang.get('profile_pais_nacimiento');
        const ciudad_nacimiento = this.props.store.lang.get('profile_ciudad_nacimiento');
        const pais_residencia = this.props.store.lang.get('profile_pais_residencia');
        const ciudad_residencia = this.props.store.lang.get('profile_ciudad_residencia');
        const direccion = this.props.store.lang.get('profile_direccion');
        const telefono = this.props.store.lang.get('profile_telefono');
        const celular = this.props.store.lang.get('profile_celular');
        const save = this.props.store.lang.get('app_save');
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Field>
                        <label>{pais_nacimiento}</label>
                        <Form.Input 
                            name="pais_nacimiento"
                            onChange={this.onHandlerChange}
                            value={this.form.pais_nacimiento}
                            placeholder={pais_nacimiento} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{ciudad_nacimiento}</label>
                        <Form.Input
                            name='ciudad_nacimiento' 
                            onChange={this.onHandlerChange}
                            value={this.form.ciudad_nacimiento}
                            placeholder={ciudad_nacimiento} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{pais_residencia}</label>
                        <Form.Input
                            name='pais_residencia' 
                            onChange={this.onHandlerChange}
                            value={this.form.pais_residencia}
                            placeholder={pais_residencia} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{ciudad_residencia}</label>
                        <Form.Input
                            name='ciudad_residencia' 
                            onChange={this.onHandlerChange}
                            value={this.form.ciudad_residencia}
                            placeholder={ciudad_residencia} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{direccion}</label>
                        <Form.Input
                            name='direccion' 
                            onChange={this.onHandlerChange}
                            value={this.form.direccion}
                            placeholder={direccion} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{telefono}</label>
                        <Form.Input
                            name='telefono' 
                            onChange={this.onHandlerChange}
                            value={this.form.telefono}
                            placeholder={telefono} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{celular}</label>
                        <Form.Input
                            name='celular' 
                            onChange={this.onHandlerChange}
                            value={this.form.celular}
                            placeholder={celular} />
                    </Form.Field>
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