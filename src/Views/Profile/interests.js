import React from 'react';

import { Form } from 'semantic-ui-react'

import Permisos from '../../Lib/Permisos';
import InterestsCtrl from './interests.ctrl';


const TextAreaStyle = {height: 73};

export default class Interests extends InterestsCtrl {
    form = {}
    render() {
        const personalidad = this.props.store.lang.get('profile_personalidad');
        const intereses = this.props.store.lang.get('profile_intereses');
        const series = this.props.store.lang.get('profile_series');
        const musica = this.props.store.lang.get('profile_musica');
        const creencias_religiosas = this.props.store.lang.get('profile_creencias_religiosas');
        const creencias_politicas = this.props.store.lang.get('profile_creencias_politicas');
        const save = this.props.store.lang.get('app_save');
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Field>
                        <label>{personalidad}</label>
                        <Form.TextArea 
                            name="personalidad"
                            style={TextAreaStyle}
                            onChange={this.onHandlerChange}
                            value={this.form.personalidad}
                            placeholder={personalidad} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{intereses}</label>
                        <Form.TextArea 
                            name="intereses"
                            style={TextAreaStyle}
                            onChange={this.onHandlerChange}
                            value={this.form.intereses}
                            placeholder={intereses} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{series}</label>
                        <Form.TextArea 
                            name="series"
                            style={TextAreaStyle}
                            onChange={this.onHandlerChange}
                            value={this.form.series}
                            placeholder={series} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{musica}</label>
                        <Form.TextArea 
                            name="musica"
                            style={TextAreaStyle}
                            onChange={this.onHandlerChange}
                            value={this.form.musica}
                            placeholder={musica} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{creencias_religiosas}</label>
                        <Form.TextArea 
                            name="creencias_religiosas"
                            style={TextAreaStyle}
                            onChange={this.onHandlerChange}
                            value={this.form.creencias_religiosas}
                            placeholder={creencias_religiosas} />
                    </Form.Field>
                    <Permisos label={save} />
                    <br/>
                    <br/>

                    <Form.Field>
                        <label>{creencias_politicas}</label>
                        <Form.TextArea 
                            name="creencias_politicas"
                            style={TextAreaStyle}
                            onChange={this.onHandlerChange}
                            value={this.form.creencias_politicas}
                            placeholder={creencias_politicas} />
                    </Form.Field>
                    <Permisos label={save} />
                </Form>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}