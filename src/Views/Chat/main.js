import React from 'react';

import { Button, Comment } from 'semantic-ui-react'

import ChatCtrl from './main.ctrl';
const moment = window.moment;

if(window.attachEvent && !window.addEventListener)
    window.addEventListener = window.attachEvent;
else if(!window.addEventListener)
    window.addEventListener = () => {};


(function() {
    var resizeTimeout = null;
    function resizeThrottler() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                actualResizeHandler();
            }, 66);
        }
    }
    function actualResizeHandler() {
        const height = window.innerHeight
                        || document.documentElement.clientHeight
                        || document.body.clientHeight;
        var el = document.getElementById("conversacion");
        el.style.height = (height - 140) + 'px';
    }
    window.addEventListener("resize", resizeThrottler, false);
}());


export default class Chat extends ChatCtrl {
    form = {mensaje: ""}
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['wss'], "Chat");
        this.props.store.chat.consultar({user: this.props.params.user});
    }

    doScroll = () => {
        var el = document.getElementById("conversacion");
        var doScroll = el.scrollHeight - el.clientHeight;
        if (el.scrollTop !== doScroll) {
            el.scrollTop = doScroll;
        }
    }

    componentDidUpdate = () => {
        this.doScroll();
    }

    render = () => {
        const session = this.props.store.getState().session;
        const usuario = this.props.store.getState().usuario;
        const store = this.props.store;
        const send = store.lang.get('chat_mensaje_send');
        const label = store.lang.get('chat_mensaje_texto');
        const chats = store.getState().chats[this.props.params.user] || [];
        const height = window.innerHeight
                        || document.documentElement.clientHeight
                        || document.body.clientHeight;
        return (
            <div style={{border: "1px solid rgba(34,36,38,.15)", height: "100%", display: 'flex', flexDirection: 'column'}}>
                <div style={{flex:1, margin: 10}}>
                    <div id="conversacion" onScroll={this.onScroll} style={{height: height - 140, overflowY: 'scroll'}}>
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

