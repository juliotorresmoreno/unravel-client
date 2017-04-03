import React from 'react';
import { Menu } from 'semantic-ui-react';

import MenuRightCtrl from './index.ctrl';

export default class MenuRight extends MenuRightCtrl {
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
        return (
            <div className="MenuRight" style={{margin:15}}>
                <Menu vertical>
                    {friends.map((friend, index) => {
                        if (friend.estado !== "Amigos")
                            return null;
                        var color;
                        if (friend.chat === true) {
                            color = "#d68910";
                        } else if(friend.conectado) {
                            color = "#28b463";
                        } else {
                            color = "#e74c3c";
                        }
                        return (
                            <Menu.Item key={index} as="a" style={{backgroundColor:color}} onClick={this.handleItemClick} href={"/" + friend.usuario + "/chat"}>
                                <div style={{color: "white"}}>{friend.fullname}</div>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
        )
    }
}