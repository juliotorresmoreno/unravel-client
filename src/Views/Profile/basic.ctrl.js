import React from 'react';
const { Component } = React;

export default class BasicCtrl extends Component {
    onHandlerGuardarNombres = (e, obj) => {
        var params = {
            nombres: this.form.nombres,
            apellidos: this.form.apellidos
        };
        this.props.store.profile.update(params)
            .then((response) => {
                this.props.store.getState().session.nombres = this.form.nombres;
                this.props.store.getState().session.apellidos = this.form.apellidos;
                this.props.store.setState({updateAt: new Date()});
            })
            .catch((error) => {
                
            });
    }
    updateProfile = (params, obj) => {
        obj.setState({isLoading: true});
        this.props.store.profile.update(params)
            .then((response) => {
                obj.setState({isLoading: false});
            })
            .catch((error) => {
                obj.setState({isLoading: false});
            });
    }
    onHandlerGuardarEmail = (e, obj, permiso) => {
        this.updateProfile({
            email: this.form.email,
            permiso_email: permiso
        }, obj);
    }
    onHandlerGuardarMesDia = (e, obj, permiso) => {
        this.updateProfile({
            nacimiento_mes: this.form.nacimiento_mes,
            nacimiento_dia: this.form.nacimiento_dia,
            permiso_nacimiento_dia: permiso
        }, obj);
    }
    onHandlerGuardarAno = (e, obj, permiso) => {
        this.updateProfile({
            nacimiento_ano: this.form.nacimiento_ano,
            permiso_nacimiento_ano: permiso
        }, obj);
    }
    onHandlerGuardarSexo = (e, obj, permiso) => {
        this.updateProfile({
            sexo: this.form.sexo,
            permiso_sexo: permiso
        }, obj);
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
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
    onHandlerChangeMes = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.showDays();
        this.forceUpdate();
    }
}