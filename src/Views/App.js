import React, { Component } from 'react';

import Head from './Head';
import Loading from './Loading';
import Main from './Main';
import News from './News';


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
    getChildren() {
        const {store} = this.props.route;
        if (this.isLoading)
            return <Loading />;
        if (this.props.children)
            return React.cloneElement(this.props.children, { store: store });
        return <News store={store} />;
    }
    render() {
        var autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;
        var usuario = this.props.route.store.getState().usuario || {};
        var session = this.props.route.store.getState().session;
        var isLogged = autorized && this.props.route.store.getState().session;
        var user = this.props.params.user;

        if (user && isLogged && usuario.usuario !== user && session.usuario !== user)
        {
            this.isLoading = true;
            this.props.route.store.friends.getUser(user)
                .then((data) => {
                    this.isLoading = false;
                    this.mounted ? this.forceUpdate(): void(0);
                });
        }
        else if (session !== undefined)
        {
            this.isLoading = false;
        }

        let children = this.getChildren();
        var params = this.props.params;
        var store  = this.props.route.store;
        var route  = this.props.route;
        var router = this.props.router;
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <Head params={params} route={route} router={router} store={store} />
                <Main params={params} route={route} router={router} store={store}>
                    {children}
                </Main>
            </div>
        );
    }
}

export default App;