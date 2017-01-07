import React from 'react';

import { Form } from 'semantic-ui-react';

import Permisos from '../../Lib/Permisos';
import ContactCtrl from './contact.ctrl';


export default class Contact extends ContactCtrl {
    form = {};
    constructor(args) {
        super(args);
        /*const session = (() => {
            if (this.props.params.user && this.props.store.getState().usuario)
                return this.props.store.getState().usuario;
            return this.props.store.getState().session;
        })();*/
        this.form = Object.assign(this.props.store.getState().profile, this.form);
    }
    render() {
        const nacimiento_pais = this.props.store.lang.get('profile_pais_nacimiento');
        const nacimiento_ciudad = this.props.store.lang.get('profile_ciudad_nacimiento');
        const residencia_pais = this.props.store.lang.get('profile_pais_residencia');
        const residencia_ciudad = this.props.store.lang.get('profile_ciudad_residencia');
        const direccion = this.props.store.lang.get('profile_direccion');
        const telefono = this.props.store.lang.get('profile_telefono');
        const celular = this.props.store.lang.get('profile_celular');
        const save = this.props.store.lang.get('app_save');
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Field>
                        <label>{nacimiento_pais}</label>
                        <Form.Input 
                            name="nacimiento_pais"
                            onChange={this.onHandlerChange}
                            value={this.form.nacimiento_pais}
                            placeholder={nacimiento_pais} />
                    </Form.Field>
                    <Permisos label={save} onClick={this.onHandlerGuardarNacimientoPais}
                        permiso={this.props.store.getState().profile.permiso_nacimiento_pais} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{nacimiento_ciudad}</label>
                        <Form.Input
                            name='nacimiento_ciudad' 
                            onChange={this.onHandlerChange}
                            value={this.form.nacimiento_ciudad}
                            placeholder={nacimiento_ciudad} />
                    </Form.Field>
                    <Permisos label={save} onClick={this.onHandlerGuardarNacimientoCiudad}
                        permiso={this.props.store.getState().profile.permiso_nacimiento_ciudad} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{residencia_pais}</label>
                        <Form.Input
                            name='residencia_pais' 
                            onChange={this.onHandlerChange}
                            value={this.form.residencia_pais}
                            placeholder={residencia_pais} />
                    </Form.Field>
                    <Permisos label={save} onClick={this.onHandlerGuardarResidenciaPais}
                        permiso={this.props.store.getState().profile.permiso_residencia_pais} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{residencia_ciudad}</label>
                        <Form.Input
                            name='residencia_ciudad' 
                            onChange={this.onHandlerChange}
                            value={this.form.residencia_ciudad}
                            placeholder={residencia_ciudad} />
                    </Form.Field>
                    <Permisos label={save} onClick={this.onHandlerGuardarResidenciaCiudad}
                        permiso={this.props.store.getState().profile.permiso_residencia_ciudad} />
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
                    <Permisos label={save} onClick={this.onHandlerGuardarDireccion}
                        permiso={this.props.store.getState().profile.permiso_direccion} />
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
                    <Permisos label={save} onClick={this.onHandlerGuardarTelefono}
                        permiso={this.props.store.getState().profile.permiso_telefono} />
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
                    <Permisos label={save} onClick={this.onHandlerGuardarCelular}
                        permiso={this.props.store.getState().profile.permiso_celular} />

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