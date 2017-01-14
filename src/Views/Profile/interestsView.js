import React from 'react';

import { Form } from 'semantic-ui-react'
import InterestsViewCtrl from './interestsView.ctrl';

export default class InterestsView extends InterestsViewCtrl {
    form = {};
    constructor(args) {
        super(args);
        if(this.props.store.getState().profile) {
            this.form = Object.assign(this.props.store.getState().profile, this.form);
            if(this.form.nacimiento_mes)
                this.showDays();
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
                    {campoComponent('profile_personalidad', 'personalidad')}
                    {campoComponent('profile_intereses', 'intereses')}
                    {campoComponent('profile_series', 'series')}
                    {campoComponent('profile_musica', 'musica')}
                    {campoComponent('profile_creencias_religiosas', 'creencias_religiosas')}
                    {campoComponent('profile_creencias_politicas', 'creencias_politicas')}
                </Form>
            </div>
        );
    }
}