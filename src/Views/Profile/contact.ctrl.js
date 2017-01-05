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
    onHandlerGuardarNacimientoPais = (e, obj, permiso) => {
        this.updateProfile({
            nacimiento_pais: this.form.nacimiento_pais,
            permiso_nacimiento_pais: permiso
        }, obj);
    }
    onHandlerGuardarNacimientoCiudad = (e, obj, permiso) => {
        this.updateProfile({
            nacimiento_ciudad: this.form.nacimiento_ciudad,
            permiso_nacimiento_ciudad: permiso
        }, obj);
    }
    onHandlerGuardarResidenciaPais = (e, obj, permiso) => {
        this.updateProfile({
            residencia_pais: this.form.residencia_pais,
            permiso_residencia_pais: permiso
        }, obj);
    }
    onHandlerGuardarResidenciaCiudad = (e, obj, permiso) => {
        this.updateProfile({
            residencia_ciudad: this.form.residencia_ciudad,
            permiso_residencia_ciudad: permiso
        }, obj);
    }

    onHandlerGuardarDireccion = (e, obj, permiso) => {
        this.updateProfile({
            direccion: this.form.direccion,
            permiso_direccion: permiso
        }, obj);
    }
    onHandlerGuardarTelefono = (e, obj, permiso) => {
        this.updateProfile({
            telefono: this.form.telefono,
            permiso_telefono: permiso
        }, obj);
    }
    onHandlerGuardarCelular = (e, obj, permiso) => {
        this.updateProfile({
            celular: this.form.celular,
            permiso_celular: permiso
        }, obj);
    }
}