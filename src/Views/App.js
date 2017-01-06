import React, { Component } from 'react';

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
                    if(this.mounted) {
                        this.forceUpdate();
                    }
                });
        } else {
            this.session = this.props.route.store.getState().session;
        }
    }
    componentWillMount() {
        var autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;
        var usuario = this.props.route.store.getState().usuario;
        var isLogged = autorized && this.props.route.store.getState().session;
        var user = this.props.params.user;
        if ((!usuario || usuario.usuario !== user) && user && isLogged)
        {
            this.isLoading = true;
            this.props.route.store.friends.get(this.props.params.user)
                .then((data) => {
                    this.isLoading = false;
                    this.forceUpdate();
                    console.log(this.props.route.store.getState());
                });
        } else {
            this.isLoading = false;
        }
    }
    render() {
        var autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;
        let children = (() => {
            if (this.isLoading)
                return <div>Loading</div>
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
        }
        return (
            <div>
                <Head params={params} route={route} router={router} store={store} />
                {autorized ? <Login params={params} route={route} router={router} store={store}/>: children}
            </div>
        );
    }
}

export default App;