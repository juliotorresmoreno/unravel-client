import React from 'react';

import { Button } from 'semantic-ui-react'
import Conversacion from './conversacion';
import VideoLLamada from './videollamada';
import ChatCtrl from './index.ctrl';


export default class Chat extends ChatCtrl {
    form = {mensaje: ""}
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['wss', 'chats'], "Chat");

        const chats = this.props.store.getState().chats[this.props.params.user] || [{}];
        if (chats.length > 0) {
            const fecha = chats[chats.length - 1].fecha;
            this.props.store.chat.consultar({user: this.props.params.user, despuesDe: fecha});
        } else {
            this.props.store.chat.consultar({user: this.props.params.user});
        }
    }
    
    render = () => {
        const store = this.props.store;
        const usuario = store.getState().usuario;
        const send = store.lang.get('chat_mensaje_send');
        const label = store.lang.get('chat_mensaje_texto');
        const llamada = store.lang.get('chat_llamada');
        const videollamada = store.lang.get('chat_videollamada');
        const chats = store.getState().chats[this.props.params.user] || [];
        var content;
        if (store.getState().usuario.videollamada === true) {
            content = <VideoLLamada store={store} />;
        } else {
            content = <Conversacion store={store} chats={chats} />;
        }
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
                    {content}
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

