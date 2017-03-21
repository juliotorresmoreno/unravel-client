import React, { Component } from 'react';

import Error from './Error';
import Modal from './Modal';
import Head from './Head';
import Loading from './Loading';
import Main from './Main';
import News from './News';
import Login from './Login';

class App extends Component {
    isLoading = true;
    constructor(args) {
        super(args);
        const { store } = this.props.route;
        store.subscribe(this, ['session', 'usuario', 'error', 'content'], 'App');
        if (store.getState().session === undefined)
        {
            store.auth.getSession()
                .then(() => {
                    this.session = store.getState().session;
                    this.isLoading = false;
                    this.mounted ? this.forceUpdate(): void(0);
                    if (this.session) {
                        store.friends.friends();
                        store.connection.open(true);
                    }
                });
        } else {
            this.session = store.getState().session;
        }
    }
    getChildren() {
        const {store} = this.props.route;
        const {params, route, router} = this.props;
        const autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;
        if (this.isLoading)
            return <Loading />;
        if (autorized && !store.getState().session)
            return <Login params={params} route={route} router={router} store={store}/>;
        if (this.props.children)
            return React.cloneElement(this.props.children, {
                params:params, route:route, router:router, store:store
            });
        return <News params={params} route={route} router={router} store={store} />;
    }
    render() {
        var params = this.props.params;
        var store  = this.props.route.store;
        var route  = this.props.route;
        var router = this.props.router;
        var autorized = router.routes[router.routes.length - 1].autorized;

        var usuario = store.getState().usuario || {};
        var session = store.getState().session;
        var error = store.getState().error || '';
        var content = store.getState().content || '';
        var isLogged = autorized && store.getState().session;
        var { user } = this.props.params;

        if (user && isLogged && usuario.usuario !== user && session.usuario !== user && !this.isLoading) {
            this.isLoading = true;
            store.friends.getUser(user)
                .then((data) => {
                    this.isLoading = false;
                    this.mounted ? this.forceUpdate(): void(0);
                });
        }

        var children = this.getChildren();
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <Head params={params} route={route} router={router} store={store} />
                {<Error error={error} store={store} />}
                {<Modal content={content} store={store} />}
                <Main params={params} route={route} router={router} store={store}>
                    {children}
                </Main>
            </div>
        );
    }
}

export default App;