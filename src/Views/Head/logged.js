import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class Logged extends Component{
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
    }
    logout = (e) => {
        e.preventDefault();
        this.props.store.auth.logout()
            .then(() => {
                this.props.router.push('/');
            });
    }
    go = (e, o) => {
        e.preventDefault();
        this.props.router.push(o.href);
    }
    render = function() {
        return (
            <Menu style={{height:50, margin:0}} inverted>
                <Menu.Item active={true} as="a" href="/" onClick={this.go}>
                    Ecate
                </Menu.Item>
                <Menu.Item position='right' as="a" href="/logout" onClick={this.logout}>
                    Salir
                </Menu.Item>
            </Menu>
        );
    }
}