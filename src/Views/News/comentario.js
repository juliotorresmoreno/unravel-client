import React from 'react';

import { Comment } from 'semantic-ui-react'
import ComentarioCtrl from './comentario.ctrl';
import moment from 'moment';

export default class Comentario extends ComentarioCtrl {
    render = () => {
        const noticia = this.props.noticia || {};
        const store = this.props.store;
        const comentario = this.props.comentario || {};
        const href = "/" + noticia.usuario + "/profile";
        const url = store.getState().config.api + "/" + comentario.usuario + "/galery/fotoPerfil";
        const fecha = moment(noticia.create_at).format("MMM Do YYYY h:mm:ss a");
        const responder = store.lang.get("noticias_responder");
        return (
            <Comment.Group style={{padding:0}}>
                <Comment>
                    <Comment.Avatar src={url} />
                    <Comment.Content>
                        <Comment.Author as='a' href={href} onClick={this.go}>
                            {comentario.fullname}
                        </Comment.Author>
                        <Comment.Metadata>
                            <div>{fecha}</div>
                        </Comment.Metadata>
                        <Comment.Text>{comentario.comentarios}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action onClick={this.onHandlerReply}>{responder}</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        )
    }
}