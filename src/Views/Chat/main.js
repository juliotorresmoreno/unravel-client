import React from 'react';

import { Form, Button } from 'semantic-ui-react'

import ChatCtrl from './main.ctrl';

export default class Chat extends ChatCtrl {
    form = {}
    render = () => {
        var store = this.props.store;
        var router = this.props.router;
        const mensaje = "name";
        return (
            <div style={{border: "1px solid rgba(34,36,38,.15)", height: "100%", display: 'flex', flexDirection: 'column'}}>
                <div style={{flex:1}}>
                </div>
                <div style={{display: 'flex'}} className="field">
                    <div className="ui input" style={{flex:1}}>
                        <input name="mensaje" placeholder="name" type="text"/>
                    </div>
                    <Button primary>Enviar</Button>
                </div>
            </div>
        )
    }
}