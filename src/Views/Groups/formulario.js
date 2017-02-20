import React from 'react';

import Capture from '../../Components/Capture';
import Permisos from '../../Components/Permisos';
import WindowModal from '../../Components/WindowModal';
import FormularioCtrl from './formulario.ctrl';
import { Header, Grid, Form, Button, Image } from 'semantic-ui-react';
 
var categorias = [];

export default class Formulario extends FormularioCtrl {
    state = {open: false};
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
            this.src = store.getState().config.api + "/groups/" + params.group + "/preview";
        }
        if (!Array.isArray(store.getState().categorys)) {
            store.category.consultar();
        }
    }
    handlerCancel = (e, obj) => {
        this.props.router.push('/groups');
    }
    render = () => {	
        const {store, routes, params} = this.props;
        const crear  = store.lang.get("grupos_crear_grupos");
        const editar = store.lang.get("grupos_editar_grupos");
        const titulo = routes[1].path === "groups/create" ? crear: editar;
        const save = this.props.store.lang.get('app_save');
        const cancel = this.props.store.lang.get('app_cancel');
        const nombre = this.props.store.lang.get('grupos_nombre');
        const recortar = this.props.store.lang.get('grupos_recortar');
        const categoria = this.props.store.lang.get('grupos_categoria');
        const descripcion = this.props.store.lang.get('grupos_descripcion');
        const recortar_imagen = this.props.store.lang.get('grupos_recortar_imagen');
        const group = params.group || '';
        const grupo = store.getState().group || {};
        if (group !== '' && grupo.nombre === group) {
            this.form = store.getState().group;
        }
        const src = this.src;
        const actions = [
            <Button positive key={0} onClick={this.onHandlerRecortar}>{recortar}</Button>,
            <Button negative key={1} onClick={e => this.setState({open: false})}>{cancel}</Button>
        ];
        return (
            <div style={{minHeight: '100%'}}>
                <WindowModal title={recortar_imagen} open={this.state.open} actions={actions}>
                    <Capture ref='capture' src={this.state.src} />
                </WindowModal>
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
                            &nbsp;
                            <Button negative onClick={this.handlerCancel}>{cancel}</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column style={{width: 250}}>
                        <a onClick={this.onHandlerImagen} className="ui image" href="">
                            <Image style={{width:200,height:200}} src={src} />
                        </a>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}