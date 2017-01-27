import React from 'react';

import { Form, Comment } from 'semantic-ui-react'

import Permisos from '../../Lib/Permisos';
import ComentarioCtrl from './comentario.ctrl';
const moment = window.moment;

export default class Comentario extends ComentarioCtrl {
    render = function() {
        const noticia = this.props.noticia || {};
        const store = this.props.store;
        var url = store.getState().config.api + "/" + noticia.Usuario + "/galery/fotoPerfil?token=" + this.props.store.getState().session.token;
        return (
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={url} />
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                        <div>{moment(noticia.CreateAt).format("MMM Do YYYY")}</div>
                        </Comment.Metadata>
                        <Comment.Text>{noticia.Noticia}</Comment.Text>
                        <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        )
    }
}