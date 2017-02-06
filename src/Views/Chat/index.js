import React from 'react';

import { Button } from 'semantic-ui-react'

import VideoLlamada from './videollamada';
import Comentario from './comentario';
import ChatCtrl from './index.ctrl';

if(window.attachEvent && !window.addEventListener)
    window.addEventListener = window.attachEvent;
else if(!window.addEventListener)
    window.addEventListener = () => {};

var getHeight = function() {
    return (window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight) - 180;
};

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
        var el = document.getElementById("conversacion");
        if (el !== null && el !== undefined) {
            el.style.height = getHeight() + 'px';
        }
    }
    window.addEventListener("resize", resizeThrottler, false);
}());


export default class Chat extends ChatCtrl {
    form = {mensaje: ""}
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['wss', 'friends'], "Chat");

        const chats = this.props.store.getState().chats[this.props.params.user] || [{}];
        if (chats.length > 0) {
            const fecha = chats[chats.length - 1].fecha;
            this.props.store.chat.consultar({user: this.props.params.user, despuesDe: fecha});
        } else {
            this.props.store.chat.consultar({user: this.props.params.user});
        }
    }

    doScroll = () => {
        var el = document.getElementById("conversacion");
        var doScroll = el.scrollHeight - el.clientHeight;
        if (el.scrollTop !== doScroll) {
            el.scrollTop = doScroll;
        }
    }

    componentDidMount = () => {
        this.doScroll();
    }

    componentDidUpdate = () => {
        this.doScroll();
    }

    render = () => {
        const store = this.props.store;
        const session = store.getState().session;
        const usuario = store.getState().usuario;
        const send = store.lang.get('chat_mensaje_send');
        const label = store.lang.get('chat_mensaje_texto');
        const llamada = store.lang.get('chat_llamada');
        const videollamada = store.lang.get('chat_videollamada');
        const chats = store.getState().chats[this.props.params.user] || [];
        return (
            <div style={{border: "1px solid rgba(34,36,38,.15)", height: "100%", display: 'flex', flexDirection: 'column'}}>
                <div style={{flex:1, margin: 10}}>
                    <div style={{marginBottom: 10}}>
                        <Button primary disabled={!usuario.conectado} onClick={this.onHandlerVideollamada}>
                            {videollamada}
                        </Button>
                        <Button primary disabled={!usuario.conectado}>
                            {llamada}
                        </Button>
                    </div>
                    <div id="conversacion" onMouseDown={this.onMouseDown} onScroll={this.onScroll} style={{height: getHeight(), overflowY: 'scroll'}}>
                        {chats.map((value, index) => {
                            const user = value.usuario === session.usuario ? session: usuario;
                            const foto = store.getState().config.api + '/' + value.usuario + '/galery/fotoPerfil';
                            switch (value.action) {
                                case "mensaje":
                                    return <Comentario key={index} foto={foto} user={user} comentario={value} />;
                                case "videollamada":
                                    return <VideoLlamada key={index} foto={foto} user={user} comentario={value} store={store} />;
                                default:
                                    return null;
                            }
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

