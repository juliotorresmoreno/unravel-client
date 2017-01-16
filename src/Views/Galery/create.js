import React from 'react';

import { Form, Header } from 'semantic-ui-react';
import Permisos from '../../Lib/Permisos';

import CreateCtrl from './create.ctrl';

export default class Create extends CreateCtrl {
    form = {nombre: ""}
    render = function() {
        const save = this.props.store.lang.get('app_save');
        const permiso = this.props.store.getState().galeria.permiso_galeria;
        const nombre = this.props.store.lang.get('galeria_nombre');
        const descripcion = this.props.store.lang.get('galeria_descripcion');
        const titulo = this.props.store.lang.get('galeria_titulo_crear');
        return (
            <Form onSubmit={(e) => e.preventDefault()}>
                <Header as="h2">{titulo}</Header>
                <Form.Input 
                    name="nombre"
                    value={this.form.nombre}
                    onChange={this.onHandlerChange}
                    label={nombre} placeholder={nombre} />
                <Form.TextArea
                    name="descripcion"
                    value={this.form.descripcion}
                    onChange={this.onHandlerChange}
                    label={descripcion}
                    placeholder={descripcion} />
                <Permisos label={save} onClick={this.onHandlerGuardarGaleria} permiso={permiso} />
            </Form>
        )
    }
}