import React from 'react';

import { Form } from 'semantic-ui-react'

import Permisos from '../../Lib/Permisos';
import NewsCtrl from './index.ctrl';
const TextAreaStyle = {height: 50};

export default class News extends NewsCtrl {
    form = {noticia: ""}
    getSession = () => {
        if (this.props.params.user && this.props.store.getState().usuario)
            return this.props.store.getState().usuario;
        return this.props.store.getState().session;
    }
    render = function() {
        const publicar = this.props.store.lang.get('noticias_publicar');
        const label = this.props.store.lang.get('noticias_label');
        
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
            </div>
        )
    }
}