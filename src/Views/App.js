import React, { Component } from 'react';
import { Grid, Segment, Menu } from 'semantic-ui-react';

import Head from './Head/main';
import MenuRight from './MenuRight/main';
import Login from './Login/main';
import Register from './Register/main';
import E404 from './E404/main';

class App extends Component {
    constructor(args) {
        super(args);
        this.props.route.store.subscribe(this, ['session'], "App");
        this.props.route.store.auth.getSession();
    }
    render() {
        let children;
        if (this.props.route.store.getState().session)
        {
            children = this.props.children && React.cloneElement(this.props.children, {
                store: this.props.route.store
            });
            return (
                <div>
                    <Head router={this.props.router} store={this.props.route.store} />
                    <div style={{display:'flex',flexDirection:'vertical'}}>
                        <MenuRight router={this.props.router} store={this.props.route.store} />
                        <div style={{background: '#DDD',margin:'15px 15px 15px 0',flex:1}}>
                            {children}
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            switch(this.props.location.pathname)
            {
                case '/': case '/login':
                    children = <Login store={this.props.route.store}/>;
                    break;
                case '/signup':
                    children = <Register store={this.props.route.store}/>;
                    break;
                default:
                    children = <E404/>;
                    break;
            }
            return (
                <div>
                    <Head store={this.props.route.store} />
                    {children}
                </div>
            );
        }
    }
}

export default App;