import React from 'react';
const { Component } = React;

export default class ContactCtrl extends Component {
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
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
    onHandlerGuardarPersonalidad = (e, obj, permiso) => {
        this.updateProfile({
            personalidad: this.form.personalidad,
            permiso_personalidad: permiso
        }, obj);
    }
    onHandlerGuardarIntereses = (e, obj, permiso) => {
        this.updateProfile({
            intereses: this.form.intereses,
            permiso_intereses: permiso
        }, obj);
    }
    onHandlerGuardarSeries = (e, obj, permiso) => {
        this.updateProfile({
            series: this.form.series,
            permiso_series: permiso
        }, obj);
    }
    onHandlerGuardarMusica = (e, obj, permiso) => {
        this.updateProfile({
            musica: this.form.musica,
            permiso_musica: permiso
        }, obj);
    }
    onHandlerGuardarCreenciasReligiosas = (e, obj, permiso) => {
        this.updateProfile({
            creencias_religiosas: this.form.creencias_religiosas,
            permiso_creencias_religiosas: permiso
        }, obj);
    }
    onHandlerGuardarCreenciasPoliticas = (e, obj, permiso) => {
        this.updateProfile({
            creencias_politicas: this.form.creencias_politicas,
            permiso_creencias_politicas: permiso
        }, obj);
    }
}