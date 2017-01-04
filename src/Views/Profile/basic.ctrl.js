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
    onHandlerGuardarEmail = (e, obj, permiso) => {
        var params = {
            email: this.form.email,
            permiso_email: permiso
        };
        obj.setState({isLoading: true});
        this.props.store.profile.update(params)
            .then((response) => {
                obj.setState({isLoading: false});
            })
            .catch((error) => {
                obj.setState({isLoading: false});
            });
    }
    onHandlerGuardarMesDia = (e, obj, permiso) => {
        var params = {
            nacimiento_mes: this.form.nacimiento_mes,
            nacimiento_dia: this.form.nacimiento_dia,
            permiso_nacimiento_dia: permiso
        };
        obj.setState({isLoading: true});
        this.props.store.profile.update(params)
            .then((response) => {
                obj.setState({isLoading: false});
            })
            .catch((error) => {
                obj.setState({isLoading: false});
            });
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
    onHandlerChangeMes = (e, obj) => {
        //Enero 01, Marzo 03, Mayo 05, Julio 07, Agosto 08, Octubre 10 y Diciembre 12
        var mes = obj.name === 'nacimiento_mes' ? obj.value: this.form.nacimiento_mes;
        var ano = obj.name === 'nacimiento_ano' ? obj.value: this.form.nacimiento_ano;
        if(mes === undefined)
            if(!(obj.name === 'nacimiento_ano' && this.onHandlerChange(e, obj)))
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
        this.onHandlerChange(e, obj);
    }
}