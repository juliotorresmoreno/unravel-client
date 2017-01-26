import React from 'react';

import { Form } from 'semantic-ui-react'

import Permisos from '../../Lib/Permisos';
import NewsCtrl from './index.ctrl';
const TextAreaStyle = {height: 50};

export default class News extends NewsCtrl {
    render = function() {
        const save = this.props.store.lang.get('app_save');
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.TextArea
                        style={TextAreaStyle}
                        name="noticia"
                        placeholder={"personalidad"} />
                    <Permisos label={save} onClick={this.onHandlerGuardarPersonalidad} />
                </Form>
            </div>
        )
    }
}