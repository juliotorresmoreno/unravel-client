import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router'

export default class NoLogged extends Component{
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
    }
    go = (e, o) => {
        e.preventDefault();
        this.props.router.push(o.href);
    };
    render = function() {
        return (
            <Menu style={{height:50, margin:0}} inverted>
                <Menu.Item active={true} as="a" href="/" onClick={this.go}>
                    Ecate
                </Menu.Item>
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

/*
<Menu.Item>
    <Dropdown text='Messages' pointing='left' className='link item'>
        <Dropdown.Menu>
            <Dropdown.Item>Inbox</Dropdown.Item>
            <Dropdown.Item>Starred</Dropdown.Item>
            <Dropdown.Item>Sent Mail</Dropdown.Item>
            <Dropdown.Item>Drafts (143)</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Spam (1009)</Dropdown.Item>
            <Dropdown.Item>Trash</Dropdown.Item>
            <Dropdown.Item>
                <Dropdown text='Messages' pointing='left' className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Inbox</Dropdown.Item>
                        <Dropdown.Item>Starred</Dropdown.Item>
                        <Dropdown.Item>Sent Mail</Dropdown.Item>
                        <Dropdown.Item>Drafts (143)</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Spam (1009)</Dropdown.Item>
                        <Dropdown.Item>Trash</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
</Menu.Item>*/