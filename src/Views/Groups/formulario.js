import React from 'react';

import Permisos from '../../Lib/Permisos';
import FormularioCtrl from './formulario.ctrl';
import { Header, Form } from 'semantic-ui-react';

export default class Formulario extends FormularioCtrl {
    form = {
        nombre: "",
        descripcion: ""
    }
    componentDidMount = () => {
        const {params} = this.props;
        if (typeof params.group !== "undefined") {
            
        }
    }
    render = () => {
        const {store, routes} = this.props;
        const crear  = store.lang.get("grupos_crear_grupos");
        const editar = store.lang.get("grupos_editar_grupos");
        const titulo = routes[1].path === "groups/create" ? crear: editar;
        const save = this.props.store.lang.get('app_save');
        const nombre = this.props.store.lang.get('grupos_nombre');
        const descripcion = this.props.store.lang.get('grupos_descripcion');
        return (
            <div style={{minHeight: '100%'}}>
                <Header as="h2">{titulo}</Header>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Field>
                        <Form.Input onChange={this.onHandlerChange} label={nombre} name="nombre" />
                    </Form.Field>
                    <Form.Field>
                        <Form.TextArea onChange={this.onHandlerChange} label={descripcion} name="descripcion" />
                    </Form.Field>
                    <Permisos label={save} onClick={this.onHandlerGuardar} permiso='public' />
                </Form>
            </div>
        )
    }
}