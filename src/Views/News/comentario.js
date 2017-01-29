import React from 'react';

import { Form, Comment, Image } from 'semantic-ui-react'
import ComentarioCtrl from './comentario.ctrl';

const moment = window.moment;

const styleIcon = {width:16,height:16,display:"inline"};

export default class Comentario extends ComentarioCtrl {
    render = () => {
const noticia = this.props.noticia || {};
        const store = this.props.store;
        const comentario = this.props.comentario || {};
        const href = "/" + noticia.usuario + "/profile";
        const url = store.getState().config.api + "/" + comentario.usuario + "/galery/fotoPerfil?token=" + this.props.store.getState().session.token;
        const fecha = moment(noticia.create_at).format("MMM Do YYYY h:mm:ss a");
        const responder = store.lang.get("noticias_responder");
        return (
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={url} />
                    <Comment.Content>
                        <Comment.Author as='a' href={href} onClick={this.go}>
                                {comentario.nombres + " " + comentario.apellidos}
                        </Comment.Author>
                        <Comment.Metadata>
                            <div>{fecha}</div>
                        </Comment.Metadata>
                        <Comment.Text>{comentario.comentarios}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>{responder}</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        )
    }
}