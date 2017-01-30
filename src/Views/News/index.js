import React from 'react';

import { Form } from 'semantic-ui-react'

import Publicacion from './publicacion';
import Permisos from '../../Lib/Permisos';
import NewsCtrl from './index.ctrl';
const TextAreaStyle = {height: 50};

export default class News extends NewsCtrl {
    form = {noticia: ""}
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['news'], "News");
        const session = this.props.store.location.getSession(this.props.params.user);
        this.props.store.news.consultar(session.usuario);
    }
    render = function() {
        const {store, router} = this.props;
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
                        placeholder={label}
                        value={this.form.noticia} />
                    <Permisos label={publicar} onClick={this.onHandlerPublicar} />
                </Form>
                <br />
                {news.map((noticia, index) => 
                    <Publicacion key={index} store={store} router={router} noticia={noticia} />)}
                <br />
            </div>
        )
    }
}