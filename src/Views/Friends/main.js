import React from 'react';

import { Form } from 'semantic-ui-react'

import CardUser from './CardUser';
import FriendsCtrl from './main.ctrl';

export default class Friends extends FriendsCtrl {
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['friends'], "Friends");
    }
    render = () => {
        const friends = this.props.store.getState().friends || [];
        var store = this.props.store;
        var router = this.props.router;
        return (
            <div>
                <Form onSubmit={this.onHandlerSearch}>
                    <Form.Field>
                        <Form.Input name="query"/>
                    </Form.Field>
                </Form>
                {friends.map(function(value, index){
                    return <CardUser key={index} store={store} router={router} user={value} />;
                })}
            </div>
        )
    }
}