import React from 'react';
import { Menu } from 'semantic-ui-react';

import MenuRightCtrl from './main.ctrl';


export default class MenuRight extends MenuRightCtrl {
    state = {};
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['friends'], "MenuRight");
    }
    handleItemClick = (e, { href }) => {
        e.preventDefault();
        this.props.router.push(href);
    }
    render = () => {
        const friends = this.props.store.getState().friends || [];
        var key = 0;
        //[{"usuario":"dmonsalve","nombres":"diana","apellidos":"monsalve","estado":"Solicitado","registrado":"0001-01-01T00:00:00Z"}]
        return (
            <div style={{margin:15}}>
                <Menu vertical>
                    {friends.map((friend) => {
                        return (
                            <Menu.Item key={key++} as="a" onClick={this.handleItemClick} href={"/" + friend.usuario + "/chat"}>
                                {friend.nombres + ' ' + friend.apellidos}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
        )
    }
}