import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router'

import LoginCtrl from './main.ctrl';

export default class Register extends LoginCtrl{
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
    }
    render = function() {
        return (
            <Menu className="bg-black">
                <Menu.Item active={true}>
                    <Link to='/'>Ecate</Link>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Link className='ui button primary' to='/signup'>{this.props.store.lang.get('login_signup')}</Link>
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