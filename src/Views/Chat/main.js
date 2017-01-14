import React from 'react';

import { Button, Comment } from 'semantic-ui-react'

import ChatCtrl from './main.ctrl';
const moment = window.moment;

export default class Chat extends ChatCtrl {
    form = {mensaje: ""}
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['wss'], "Chat");
    }
    render = () => {
        const session = this.props.store.getState().session;
        const usuario = this.props.store.getState().usuario;
        const store = this.props.store;
        const send = store.lang.get('chat_mensaje_send');
        const label = store.lang.get('chat_mensaje_texto');
        const chats = store.getState().chats[this.props.params.user] || [];
        return (
            <div style={{border: "1px solid rgba(34,36,38,.15)", height: "100%", display: 'flex', flexDirection: 'column'}}>
                <div style={{flex:1, margin: 10}}>
                {chats.map((value, index) => {
                    const user = value.usuario === session.usuario ? session: usuario;
                    return (
                        <Comment.Group key={index}>
                            <Comment>
                                <Comment.Avatar src='/static/svg/user-3.svg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>{user.nombres} {user.apellidos}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{moment(value.fecha).format("MMM Do YYYY h:mm:ss a")}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{value.mensaje}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    );
                })}
                </div>
                <div style={{display: 'flex'}} className="field">
                    <div className="ui input" style={{flex:1}}>
                        <input name="mensaje" 
                            value={this.form.mensaje}
                            onChange={this.onHandlerTextoChange}
                            onKeyPress={this.onHandlerKeyPressEnviar}
                            placeholder={label} type="text"/>
                    </div>
                    <Button primary onClick={this.onHandlerEnviar}>{send}</Button>
                </div>
            </div>
        )
    }
}

