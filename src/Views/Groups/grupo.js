import React from 'react';

import Permisos from '../../Lib/Permisos';
import GrupoCtrl from './misgrupos.ctrl';
import { Header, Form } from 'semantic-ui-react';

export default class Grupo extends GrupoCtrl {
    render = () => {
        const {store} = this.props;
        const titulo = store.lang.get("grupos_crear_grupos");
        const save = this.props.store.lang.get('app_save');
        const nombre = this.props.store.lang.get('grupos_nombre');
        const descripcion = this.props.store.lang.get('grupos_descripcion');
        return (
            <div style={{minHeight: '100%'}}>
                <Header as="h2">{titulo}</Header>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Field>
                        <Form.Input label={nombre} name="nombre" />
                    </Form.Field>
                    <Form.Field>
                        <Form.TextArea label={descripcion} name="descripcion" />
                    </Form.Field>
                    <Permisos label={save} onClick={this.onHandlerGuardar} permiso='public' />
                </Form>
            </div>
        )
    }
}