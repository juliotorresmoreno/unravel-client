import React from 'react';

import { Form } from 'semantic-ui-react';

import TodosGruposCtrl from './todosgrupos.ctrl';


export default class TodosGrupos extends TodosGruposCtrl {
    render = () => {
        return (
            <div>
                <Form onSubmit={this.onHandlerSearch}>
                    <Form.Field>
                        <Form.Input name="query"/>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}
