import React from 'react';

import { Form } from 'semantic-ui-react';

import FriendsCtrl from './main.ctrl';


export default class Friends extends FriendsCtrl {
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['friends'], "Friends");
    }
    render = function() {
        var str = JSON.stringify(this.props.store.getState().friends);
        return (
            <div>
                <Form onSubmit={this.onHandlerSearch}>
                    <Form.Field>
                        <Form.Input name="query"/>
                    </Form.Field>
                </Form>
                {str}
            </div>
        )
    }
}