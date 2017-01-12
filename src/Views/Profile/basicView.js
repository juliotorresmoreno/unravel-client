import React from 'react';
import { Form } from 'semantic-ui-react';

import BasicViewCtrl from './basicView.ctrl';

const sexos = { 'M': 'Masculino', 'F': 'Femenino', 'O': 'Otro' };
const meses = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',

    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    '10': 'Octubre',
    '11': 'Novienbre',
    '12': 'Diciembre'
};

export default class BasicView extends BasicViewCtrl {
    dias_disponibles = [];
    form = {}
    constructor(args) {
        super(args);
        this.session = (() => {
            if (this.props.params.user && this.props.store.getState().usuario)
                return this.props.store.getState().usuario;
            return this.props.store.getState().session;
        })();
        this.form.nombres = this.session.nombres;
        this.form.apellidos = this.session.apellidos;
        this.form = Object.assign(this.props.store.getState().profile, this.form);
        if(this.form.nacimiento_mes)
            this.showDays();
    }
    showDays() {
        //Enero 01, Marzo 03, Mayo 05, Julio 07, Agosto 08, Octubre 10 y Diciembre 12
        var mes = this.form.nacimiento_mes;
        var ano = this.form.nacimiento_ano;
        if(mes === undefined)
            return;
        var dias = (() => {
            if (['01', '03', '05', '07', '08', '10', '12'].indexOf(mes) + 1)
                return 31;
            if (['04', '06', '09', '11'].indexOf(mes) + 1)
                return 30;
            if (!ano || ano % 4 !== 0)
                return 28;
            return 29;
        })();
        if (this.dias_disponibles.length !== dias) {
            var source = [];
            for (let i = 1; i <= dias; i++) {
                let val = i > 9 ? i + '': '0' + i;
                source.push({value: val, text: val});
            }
            this.dias_disponibles = source;
        }
    }
    render() {
        const name = this.props.store.lang.get('login_name');
        const lastname = this.props.store.lang.get('login_lastname');
        const campoComponent = (title, value) => {
            const nacimiento_pais = this.props.store.lang.get(title);
            if (this.form[value]) {
                return (
                    <Form.Field>
                        <label>{nacimiento_pais}</label>
                        {this.form[value]}
                    </Form.Field>
                );
            }
            return null;
        }
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Field>
                        <label>{name}</label>
                        {this.form.nombres}
                    </Form.Field>
                    <Form.Field>
                        <label>{lastname}</label>
                        {this.form.apellidos}
                    </Form.Field>
                    {campoComponent('login_email', 'email')}
                    {this.campoNacimientoDia()}
                    {campoComponent('profile_nacimiento_ano', 'nacimiento_ano')}
                    {this.campoSexo()}
                </Form>
            </div>
        );
    }
    campoNacimientoDia = () => {
        const labelDia = this.props.store.lang.get('profile_nacimiento_dia');
        const labelMes = this.props.store.lang.get('profile_nacimiento_mes');        
        if (this.form.nacimiento_mes && this.form.nacimiento_dia) {
            return (
                <Form.Group>
                    <Form.Field>
                        <label>{labelMes}</label>
                        {meses[this.form.nacimiento_mes]}
                    </Form.Field>
                    <Form.Field>
                        <label>{labelDia}</label>
                        {this.form.nacimiento_dia}
                    </Form.Field>
                </Form.Group>
            );
        }
        return null;
    }
    campoSexo = () => {
        const labelSexo = this.props.store.lang.get('profile_sexo');
        if (this.form.sexo) {
            return (
                <Form.Group>
                    <Form.Field>
                        <label>{labelSexo}</label>
                        {sexos[this.form.sexo]}
                    </Form.Field>
                </Form.Group>
            );
        }
        return null;
    }
}