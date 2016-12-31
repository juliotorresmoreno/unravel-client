import React, { Component } from 'react';

import Head from './Head/main';
import MenuLeft from './MenuLeft/main';
import MenuRight from './MenuRight/main';
import News from './News/main';
import Login from './Login/main';
import Register from './Register/main';

class App extends Component {
    constructor(args) {
        super(args);
        this.props.route.store.subscribe(this, ['session'], "App");
        this.props.route.store.auth.getSession();
    }
    render() {
        if (this.props.route.store.getState().session)
        {
            let children = <News store={this.props.route.store} />;
            if(this.props.children)
            {
                children = this.props.children && React.cloneElement(this.props.children, {
                    store: this.props.route.store
                });
            }
            return (
                <div>
                    <Head router={this.props.router} store={this.props.route.store} />
                    <div style={{display:'flex',flexDirection:'vertical'}}>
                        <MenuLeft router={this.props.router} store={this.props.route.store} />
                        <div style={{background: '',margin:'15px 15px 15px 0',flex:1}}>
                            {children}
                        </div>
                        <MenuRight router={this.props.router} store={this.props.route.store} />
                    </div>
                </div>
            );
        }
        else
        {
            const pathname = this.props.location.pathname;
            const login = <Login store={this.props.route.store}/>;
            const register = <Register store={this.props.route.store}/>;
            const children = pathname !== '/signup' ? login: register;
            return (
                <div>
                    <Head router={this.props.router} store={this.props.route.store} />
                    {children}
                </div>
            );
        }
    }
}

export default App;