import React from 'react';
import ConversacionCtrl from './conversacion.ctrl';
import PeticionVideoLlamada from './peticionVideollamada';
import Comentario from './comentario';
const $ = window.$;


if(window.attachEvent && !window.addEventListener)
    window.addEventListener = window.attachEvent;
else if(!window.addEventListener)
    window.addEventListener = () => {};

const getHeight = () => $(window).height() - 180;

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
    $(window).on("resize", resizeThrottler);
}());

export default class Conversacion extends ConversacionCtrl {
    doScroll = () => {
        const store = this.props.store;
        if (store.getState().usuario.videollamada === true)
            return;
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
        const {store, chats} = this.props;
        const session = store.getState().session;
        const usuario = store.getState().usuario;
        return (
            <div id="conversacion" onMouseDown={this.onMouseDown} onScroll={this.onScroll} style={{height: getHeight(), overflowY: 'scroll'}}>
                {chats.map((value, index) => {
                    const user = value.usuario === session.usuario ? session: usuario;
                    const foto = store.getState().config.api + '/' + value.usuario + '/galery/fotoPerfil';
                    switch (value.action) {
                        case "mensaje":
                            return <Comentario key={index} foto={foto} user={user} comentario={value} />;
                        case "videollamada":
                            return <PeticionVideoLlamada key={index} foto={foto} user={user} comentario={value} store={store} />;
                        default:
                            return null;
                    }
                })}
            </div>
        )
    }
}