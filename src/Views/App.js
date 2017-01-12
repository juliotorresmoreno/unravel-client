import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';
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
                });
        } else {
            this.session = this.props.route.store.getState().session;
        }
    }
    render() {
        var autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;
        var usuario = this.props.route.store.getState().usuario;
        var session = this.props.route.store.getState().session;
        var isLogged = autorized && this.props.route.store.getState().session;
        var user = this.props.params.user;
        var isMe = !user || (session && user === session.usuario)
        if (user && isLogged && (!usuario || usuario.usuario !== user) && session.usuario !== user)
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
                return <div>Loading</div>;
            return !this.props.children ? <News store={this.props.route.store} />:
                        React.cloneElement(this.props.children, {
                            store: this.props.route.store
                        });
        })();
        var params = this.props.params;
        var store  = this.props.route.store;
        var route  = this.props.route;
        var router = this.props.router;
        if (autorized && this.props.route.store.getState().session)
        {
            if (isMe) {
                return (
                    <div>
                        <Head params={params} route={route} router={router} store={store} />
                        <div style={{display:'flex',flexDirection:'vertical'}}>
                            <MenuLeft params={params} route={route} router={router} store={store} />
                            <div style={{background: '',margin:'15px 15px 15px 0',flex:1}}>
                                {children}
                            </div>
                            <MenuRight params={params} route={route} router={router} store={store} />
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Head params={params} route={route} router={router} store={store} />
                        <div style={{display:'flex',flexDirection:'vertical'}}>
                            <MenuLeft params={params} route={route} router={router} store={store} />
                            <div style={{background: '',margin:'15px 15px 15px 0',flex:1}}>
                                <Button primary onClick={this.agregarAmigo}>Agregar</Button>
                                {children}
                            </div>
                            <MenuRight params={params} route={route} router={router} store={store} />
                        </div>
                    </div>
                );
            }
        }
        return (
            <div>
                <Head params={params} route={route} router={router} store={store} />
                {(() => {
                    if (autorized && !this.isLoading)
                        return <Login params={params} route={route} router={router} store={store}/>;
                    return children;
                })()}
            </div>
        );
    }
    agregarAmigo = () => {
        var user = this.props.params.user;
        this.props.route.store.friends.add(user);
    }
}

export default App;