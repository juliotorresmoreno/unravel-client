import React from 'react';

import Permisos from '../../Components/Permisos';
import FormularioCtrl from './formulario.ctrl';
import { Header, Grid, Form, Image } from 'semantic-ui-react';
 
var categorias = [];

export default class Formulario extends FormularioCtrl {
    form = {
        nombre: "",
        descripcion: "",
        permiso: "public"
    }
    componentWillUpdate = () => {
        const { store } = this.props;
        if (Array.isArray(store.getState().categorys)) {
            categorias = [];
            for (let i = 0; i < store.getState().categorys.length; i++) {
                let categoria = store.getState().categorys[i];
                categorias.push({ key: categoria.id, text: categoria.nombre, value: categoria.id });
            }
        }
    }
    componentDidMount = () => {
        const { params, store } = this.props;
        if (typeof params.group !== "undefined") {
            store.groups.describe(params.group);
        }
        if (!Array.isArray(store.getState().categorys)) {
            store.category.consultar();
        }
    }
    render = () => {
        const {store, routes, params} = this.props;
        const crear  = store.lang.get("grupos_crear_grupos");
        const editar = store.lang.get("grupos_editar_grupos");
        const titulo = routes[1].path === "groups/create" ? crear: editar;
        const save = this.props.store.lang.get('app_save');
        const nombre = this.props.store.lang.get('grupos_nombre');
        const categoria = this.props.store.lang.get('grupos_categoria');
        const descripcion = this.props.store.lang.get('grupos_descripcion');
        const group = params.group || '';
        const grupo = store.getState().group || {};
        if (group !== '' && grupo.nombre === group) {
            this.form = store.getState().group;
        }
        const src = "http://localhost:8080/api/v1/jtorres990/galery/fotoPerfil?t=default";
        return (
            <div style={{minHeight: '100%'}}>
                <Grid style={{display: 'flex'}} columns={2} relaxed>
                    <Grid.Column style={{flex: 1}}>
                        <Header as="h2">{titulo}</Header>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <Form.Field>
                                <Form.Input 
                                    onChange={this.onHandlerChange} 
                                    label={nombre} 
                                    value={this.form.nombre} 
                                    name="nombre" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select 
                                    label={categoria} 
                                    name="categoria" 
                                    value={this.form.categoria}
                                    onChange={this.onHandlerChange}
                                    options={categorias} search />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea 
                                    onChange={this.onHandlerChange} 
                                    label={descripcion} 
                                    value={this.form.descripcion} 
                                    name="descripcion" />
                            </Form.Field>
                            <Permisos label={save} onClick={this.onHandlerGuardar} permiso={this.form.permiso} />
                        </Form>
                    </Grid.Column>
                    <Grid.Column style={{width: 250}}>
                        <Image onClick={this.onHandlerImagen} as="a" href="" src={src} />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}