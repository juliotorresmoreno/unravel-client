import React from 'react';

import { Form, Header, Button } from 'semantic-ui-react';

import Permisos from '../../Components/Permisos';
import FormularioCtrl from './formulario.ctrl';

export default class Formulario extends FormularioCtrl {
    state = { modalOpen: false };
    form = {nombre: "", descripcion: ""};
    componentWillMount() {
        let {routes,params} = this.props;
        this.props.store.getState().galeria = {permiso: "public"};
        if (routes[1].path === "galery/:galery/editar") {
            if (this.props.store.getState().galeria.nombre === params.galery) {
                this.form = this.props.store.getState().galeria;
            } else {
                this.props.store.galery.describe(params.galery);
            }
        }
    }
    componentWillUpdate() {
        let {routes,params} = this.props;
        if (routes[1].path === "galery/:galery/editar") {
            if (this.props.store.getState().galeria.nombre === params.galery) {
                this.form = this.props.store.getState().galeria;
            }
        }
    }
    render = () => {
        const save = this.props.store.lang.get('app_save');
        const permiso = this.props.store.getState().galeria.permiso;
        const nombre = this.props.store.lang.get('galeria_nombre');
        const descripcion = this.props.store.lang.get('galeria_descripcion');
        const path = this.props.routes[1].path;
        const action = path === "galery/create" ? 'galeria_titulo_crear': 'galeria_titulo_editar';
        const titulo = this.props.store.lang.get(action);
        const cancel = this.props.store.lang.get("app_cancel");
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
                &nbsp;
                <Button primary onClick={this.onHandlerCancelar}>{cancel}</Button>
            </Form>
        )
    }
}