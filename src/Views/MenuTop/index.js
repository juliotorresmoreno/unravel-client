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
        const {label, handler} = estados[usuario.estado];
        return (
            <div>
                <Button primary onClick={handler}>
                    {label}
                </Button>
                <br />
            </div>
        );
    }
    agregarAmigo = () => {
        var user = this.props.params.user;
        this.props.store.friends.add(user);
    }
    rechazarAmigo = () => {
        var user = this.props.params.user;
        this.props.store.friends.reject(user);
    }
}