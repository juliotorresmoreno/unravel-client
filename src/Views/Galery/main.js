import React from 'react';

import { Form } from 'semantic-ui-react';
import Permisos from '../../Lib/Permisos';

import GaleryCtrl from './main.ctrl';

export default class Galery extends GaleryCtrl {
    render = function() {
        const save = this.props.store.lang.get('app_save');
        const permiso = this.props.store.getState().galeria.permiso_galeria;
        return (
            <Form>
                <Form.Input label='First name' placeholder='First name' />
                <Form.TextArea label='About' placeholder='Tell us more about you...' />
                <Form.Checkbox label='I agree to the Terms and Conditions' />
                <Form.Button primary>Submit</Form.Button>
                <Permisos label={save} onClick={this.onHandlerGuardarGaleria} permiso={permiso} />
            </Form>
        )
    }
}