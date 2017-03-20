import React from 'react';

import { Form } from 'semantic-ui-react'
import Permisos from '../../Components/Permisos';
import PublicarCtrl from './index.ctrl';
const TextAreaStyle = {height: 50};

export default class Publicar extends PublicarCtrl {
    form = {noticia: ""};
    render = function() {
        const {store} = this.props;
        const publicar = store.lang.get('noticias_publicar');
        const label = store.lang.get('noticias_label');
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
            </div>
        )
    }
}