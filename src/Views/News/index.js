import React from 'react';

import { Form } from 'semantic-ui-react'
import Publicacion from './publicacion';
import Permisos from '../../Lib/Permisos';
import NewsCtrl from './index.ctrl';
const TextAreaStyle = {height: 50};

export default class News extends NewsCtrl {
    form = {noticia: ""}
    componentWillMount() {
        const {store,params} = this.props;
        store.subscribe(this, ['news'], "News");
        const session = store.location.getSession(params.user);
        store.getState().news = {};
        store.news.consultar({usuario: session.usuario});
    }
    getNews = function() {
        const {store} = this.props;
        if (!store.getState().news)
            return [];
        return store.getState().news.data || [];
    }
    render = function() {
        const {store, router} = this.props;
        const publicar = store.lang.get('noticias_publicar');
        const label = store.lang.get('noticias_label');
        const news = this.getNews();
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
                <a onClick={this.onHandlerMore} href="#">Mas</a>
                <br />
                <br />
            </div>
        )
    }
}