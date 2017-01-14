import React from 'react';
import { Form } from 'semantic-ui-react';
import ContactViewCtrl from './contactView.ctrl';


export default class ContactView extends ContactViewCtrl {
    form = {};
    constructor(args) {
        super(args);
        if(this.props.store.getState().profile) {
            this.form = Object.assign(this.props.store.getState().profile, this.form);
        }
    }
    render() {
        const campoComponent = (title, value) => {
            if (this.form[value]) {
                return (
                    <Form.Field>
                        <label>{this.props.store.lang.get(title)}</label>
                        {this.form[value]}
                    </Form.Field>
                );
            }
            return null;
        }
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}>
                    {campoComponent('profile_pais_nacimiento', 'nacimiento_pais')}
                    {campoComponent('profile_ciudad_nacimiento', 'nacimiento_ciudad')}
                    {campoComponent('profile_pais_residencia', 'residencia_pais')}
                    {campoComponent('profile_ciudad_residencia', 'residencia_ciudad')}
                    {campoComponent('profile_direccion', 'direccion')}
                    {campoComponent('profile_telefono', 'telefono')}
                    {campoComponent('profile_celular', 'celular')}
                </Form>
            </div>
        );
    }
}