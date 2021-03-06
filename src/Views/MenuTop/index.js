import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';

export default class MenuTop extends Component {
    render = () => {
        const
            store = this.props.store,
            usuario = store.getState().usuario || {},
            session = store.getState().session || {},
            solicito = usuario.relacion && usuario.relacion.usuario_solicita === session.usuario,
            user = this.props.params.user;
        const estados = {
            Desconocido: {label: "Agregar", handler: this.agregarAmigo},
            Solicitado: {label: solicito ? "Cancelar solicitud": "Rechazar solicitud", handler: this.rechazarAmigo}
        }
        if (!user || (session && user === session.usuario) || typeof estados[usuario.estado] === "undefined")
            return null;
        const sw = usuario.estado === "Solicitado" && !solicito;
        const {label, handler} = estados[usuario.estado];
        return (
            <div style={{marginBottom: 15}}>
                {sw?<Button primary onClick={this.agregarAmigo}>Aceptar</Button>:null}
                <Button primary onClick={handler}>{label}</Button>
                <br />
            </div>
        );
    }
    agregarAmigo = () => {
        var user = this.props.params.user;
        var store = this.props.store;
        store.friends.add(user)
            .then(() => {
                store.friends.friends();
            });
    }
    rechazarAmigo = () => {
        var user = this.props.params.user;
        var store = this.props.store;
        store.friends.reject(user)
            .then(() => {
                store.friends.friends();
            });
    }
}