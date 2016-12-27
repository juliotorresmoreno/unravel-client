import React, { Component } from 'react';

import Head from './Head/main';

class App extends Component {
    constructor(args) {
        super(args);
        this.props.route.store.auth.getSession();
    }
    render() {
        var children = this.props.children && React.cloneElement(this.props.children, {
            store: this.props.route.store
        });
        return (
            <div>
                <Head store={this.props.route.store} />
                {children}
            </div>
        );
    }
}

export default App;