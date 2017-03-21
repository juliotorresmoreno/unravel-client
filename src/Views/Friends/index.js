import React from 'react';

import { Form } from 'semantic-ui-react'

import CardUser from './CardUser';
import FriendsCtrl from './index.ctrl';

export default class Friends extends FriendsCtrl {
    componentWillMount = () => {
        const {store, params} = this.props;
        store.subscribe(this, ['friends', 'people', 'usuarios'], "Friends");
        const isme = params.user === undefined;
        if (isme === false) {
            store.friends.friendsByUser({user: params.user});
        }
    }
    render = () => {
        const {store, router, params} = this.props;
        const isme = params.user === undefined;
        var usuarios;
        if (isme === false) {
            usuarios = store.getState().usuarios || [];
        } else {
            usuarios = store.getState().people || store.getState().friends || [];
        }
        return (
            <div>
                <Form onSubmit={this.onHandlerSearch}>
                    <Form.Field>
                        <Form.Input name="query"/>
                    </Form.Field>
                </Form>
                {usuarios.map(function(value, index){
                    return <CardUser key={index} store={store} router={router} user={value} />;
                })}
            </div>
        )
    }
}