import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router'

export default class NoLogged extends Component{
    go = (e, o) => {
        e.preventDefault();
        this.props.router.push(o.href);
    };
    render = () => {
        return (
            <Menu style={{height:50, margin:0}} inverted>
                <Menu.Item active={true} as="a" href="/" onClick={this.go}>Unravel</Menu.Item>
                <Menu.Item position='right'>
                    <Link className='ui button primary' to='/signup'>
                        {this.props.store.lang.get('login_signup')}
                    </Link>
                </Menu.Item>
                <Menu.Item as="a" href="/" onClick={this.go}>
                    {this.props.store.lang.get('login_login')}
                </Menu.Item>
            </Menu>
        );
    }
}