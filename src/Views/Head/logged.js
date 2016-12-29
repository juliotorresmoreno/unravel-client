import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

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
    render = function() {
        return (
            <Menu style={{height:50, margin:0}} inverted>
                <Menu.Item active={true}>
                    <Link to='/'>Ecate</Link>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Link to="/logout" onClick={this.logout}>Salir</Link>
                </Menu.Item>
            </Menu>
        );
    }
}