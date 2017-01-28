import React from 'react';

import { Comment, Image } from 'semantic-ui-react'
import ComentarioCtrl from './comentario.ctrl';

const moment = window.moment;

export default class Comentario extends ComentarioCtrl {
    go = (e) => {
        e.preventDefault();
        this.props.router.push(e.target.href.replace(/http(s){0,1}:\/\/[^\/]*/, ''));
    }
    render = () => {
        const noticia = this.props.noticia || {};
        const store = this.props.store;
        const url = store.getState().config.api + "/" + noticia.usuario + "/galery/fotoPerfil?token=" + this.props.store.getState().session.token;
        const href = "/" + noticia.usuario + "/profile";
        const fecha = moment(noticia.create_at).format("MMM Do YYYY h:mm:ss a");
        return (
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={url} />
                    <Comment.Content>
                        <Comment.Author as='a' href={href} onClick={this.go}>
                            {noticia.nombres + " " + noticia.apellidos}
                        </Comment.Author>
                        <Comment.Metadata>
                            <div>{fecha}</div>
                        </Comment.Metadata>
                        <Comment.Text>{noticia.noticia}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>
                                <Image src="/static/svg/like-1.svg" />
                            </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        )
    }
}