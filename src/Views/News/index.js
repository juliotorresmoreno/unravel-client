import React from 'react';

import { Form, Comment } from 'semantic-ui-react'

import Comentario from './comentario';
import Permisos from '../../Lib/Permisos';
import NewsCtrl from './index.ctrl';
const TextAreaStyle = {height: 50};

export default class News extends NewsCtrl {
    form = {noticia: ""}
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['news'], "News");
        const session = this.getSession();
        this.props.store.news.consultar(session.usuario);
    }
    getSession = () => {
        if (this.props.params.user && this.props.store.getState().usuario)
            return this.props.store.getState().usuario;
        return this.props.store.getState().session;
    }
    render = function() {
        const store = this.props.store;
        const publicar = store.lang.get('noticias_publicar');
        const label = store.lang.get('noticias_label');
        const news = store.getState().news || [];
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.TextArea
                        onChange={this.onHandlerChange}
                        style={TextAreaStyle}
                        name="noticia"
                        placeholder={label} />
                    <Permisos label={publicar} onClick={this.onHandlerPublicar} />
                </Form>
                <br />
                {news.map((noticia, index) => <Comentario key={index} store={store} noticia={noticia} />)}
            </div>
        )
    }
}