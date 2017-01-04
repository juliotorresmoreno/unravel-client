import React, { Component } from 'react';

import Head from './Head/main';
import MenuLeft from './MenuLeft/main';
import MenuRight from './MenuRight/main';
import News from './News/main';
import Login from './Login/main';

class App extends Component {
    constructor(args) {
        super(args);
        this.props.route.store.subscribe(this, ['session'], "App");
        if (!this.props.route.store.getState().session)
        {
            this.props.route.store.auth.getSession();
        }
    }
    render() {
        var autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;       
        let children = !this.props.children ? <News store={this.props.route.store} />:
            React.cloneElement(this.props.children, {
                store: this.props.route.store
            });
        if (autorized && this.props.route.store.getState().session)
        {
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
        return (
            <div>
                <Head router={this.props.router} store={this.props.route.store} />
                {autorized ? <Login store={this.props.route.store}/>: children}
            </div>
        );
    }
}

export default App;