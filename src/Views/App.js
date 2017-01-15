import React, { Component } from 'react';

import { Button, Message, Icon } from 'semantic-ui-react';
import Head from './Head/main';
import MenuLeft from './MenuLeft/main';
import MenuRight from './MenuRight/main';
import News from './News/main';
import Login from './Login/main';

class App extends Component {
    isLoading = true;
    constructor(args) {
        super(args);
        this.props.route.store.subscribe(this, ['session'], "App");
        if (this.props.route.store.getState().session === undefined)
        {
            this.props.route.store.auth.getSession()
                .then(() => {
                    this.session = this.props.route.store.getState().session;
                    this.isLoading = false;
                    this.mounted ? this.forceUpdate(): void(0);
                    this.session ? this.props.route.store.friends.find(): void(0);
                });
        } else {
            this.session = this.props.route.store.getState().session;
        }
    }
    render() {
        var autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;
        var usuario = this.props.route.store.getState().usuario || {};
        var session = this.props.route.store.getState().session;
        var isLogged = autorized && this.props.route.store.getState().session;
        var user = this.props.params.user;
        var isMe = !user || (session && user === session.usuario);

        if (user && isLogged && usuario.usuario !== user && session.usuario !== user)
        {
            this.isLoading = true;
            this.props.route.store.friends.getUser(user)
                .then((data) => {
                    this.isLoading = false;
                    this.forceUpdate();
                });
        }
        else if (session !== undefined)
        {
            this.isLoading = false;
        }

        let children = (() => {
            if (this.isLoading)
                return (
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                        <Message.Header>Espere un momento</Message.Header>
                            Estamos cargando el contenido.
                        </Message.Content>
                    </Message>
                );
            return !this.props.children ? <News store={this.props.route.store} />:
                        React.cloneElement(this.props.children, {
                            store: this.props.route.store
                        });
        })();
        var params = this.props.params;
        var store  = this.props.route.store;
        var route  = this.props.route;
        var router = this.props.router;
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <Head params={params} route={route} router={router} store={store} />
                {(() => {
                    if (autorized && this.props.route.store.getState().session)
                        return (
                            <div style={{display:'flex',flexDirection:'vertical',height:'100%'}}>
                                <MenuLeft params={params} route={route} router={router} store={store} />
                                <div style={{padding:'15px 0',flex:1}}>
                                    {(() => {
                                        if (isMe) return children;
                                        return (
                                            <div style={{height: '100%'}}>
                                                {(() => {
                                                    switch(usuario.estado) {
                                                        case "Desconocido":
                                                            return [
                                                                <Button key={0} primary onClick={this.agregarAmigo}>
                                                                    Agregar
                                                                </Button>, 
                                                                <br key={1} />
                                                            ];
                                                        case "Solicitado":
                                                            var solicito = usuario.relacion && usuario.relacion.usuario_solicita === session.usuario;
                                                            var result = [
                                                                <Button key={1} primary onClick={this.rechazarAmigo}>
                                                                    {solicito?"Cancelar soliitud": "Rechazar soliitud"}
                                                                </Button>,
                                                                <br key={2} />
                                                            ];
                                                            if(solicito === false)
                                                                result.unshift(
                                                                    <Button key={0} primary onClick={this.agregarAmigo}>
                                                                        Aceptar
                                                                    </Button>
                                                                );
                                                            return result;
                                                        default:
                                                    }
                                                })()}
                                                {children}
                                            </div>
                                        );
                                    })()}
                                </div>
                                <MenuRight params={params} route={route} router={router} store={store} />
                            </div>
                        );
                    if (autorized && !this.isLoading)
                        return <Login params={params} route={route} router={router} store={store}/>;
                    return children;
                })()}
            </div>
        );
    }
    agregarAmigo = () => {
        var user = this.props.params.user;
        this.props.route.store.friends.add(user).then(() => {});
    }
    rechazarAmigo = () => {
        var user = this.props.params.user;
        this.props.route.store.friends.reject(user).then(() => {});
    }
}

export default App;