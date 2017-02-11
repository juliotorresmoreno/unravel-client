import React from 'react';
import { Comment } from 'semantic-ui-react'
import ComentarioCtrl from './comentario.ctrl';
import moment from 'moment';

export default class Comentario extends ComentarioCtrl {
    render = () => {
        const {user, foto} = this.props;
        const value = this.props.comentario;
        return (
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={foto} />
                    <Comment.Content>
                        <Comment.Author as='a'>{user.nombres} {user.apellidos}</Comment.Author>
                        <Comment.Metadata>
                            <div>{moment(value.fecha).format("MMM Do YYYY h:mm:ss a")}</div>
                        </Comment.Metadata>
                        <Comment.Text>{value.mensaje}</Comment.Text>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        )
    }
}