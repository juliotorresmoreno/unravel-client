import React from 'react';
import { Comment } from 'semantic-ui-react'
import VideoLlamadaCtrl from './videollamada.ctrl';
const moment = window.moment;

export default class VideoLlamada extends VideoLlamadaCtrl {
    state = {rechazado: false};
    render = () => {
        const {user, foto, store} = this.props;
        const session = store.getState().session;
        const value = this.props.comentario;
        const aceptar = store.lang.get('app_aceptar');
        const rechazar = store.lang.get('app_rechazar');
        const cancelar = store.lang.get('app_cancel');
        var mensaje, options;
        if (value.estado === "rechazada") {
            mensaje = store.lang.get("chat_mensaje_videollamada_rechazada");
            options = null;
        } else {
            if (user.usuario === session.usuario) {
                mensaje = store.lang.get('chat_mensaje_videollamada_envia');;
                options = (
                    <div>
                        <a href="" onClick={this.onHandlerRechazar}>
                            {cancelar}
                        </a>
                    </div>
                );
            } else {
                mensaje = store.lang.get('chat_mensaje_videollamada_recive');;
                options = (
                    <div>
                        <a href="" onClick={this.onHandlerAceptar}>
                            {aceptar}
                        </a>/
                        <a href="" onClick={this.onHandlerRechazar}>
                            {rechazar}
                        </a>
                    </div>
                );
            }
        }
        return (
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={foto} />
                    <Comment.Content>
                        <Comment.Author as='a'>{user.nombres} {user.apellidos}</Comment.Author>
                        <Comment.Metadata>
                            <div>{moment(value.fecha).format("MMM Do YYYY h:mm:ss a")}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <div>{mensaje}</div>
                            {options}
                        </Comment.Text>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        )
    }
}