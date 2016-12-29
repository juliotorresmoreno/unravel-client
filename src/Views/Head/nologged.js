import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router'

export default class NoLogged extends Component{
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
    }
    render = function() {
        return (
            <Menu style={{height:50, margin:0}} inverted>
                <Menu.Item active={true}>
                    <Link to='/'>Ecate</Link>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Link className='ui button primary' to='/signup'>
                        {this.props.store.lang.get('login_signup')}
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/'>
                        {this.props.store.lang.get('login_login')}
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}