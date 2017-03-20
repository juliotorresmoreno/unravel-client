import React from 'react';

import { Form, Item } from 'semantic-ui-react';
import moment from 'moment';
import TodosGruposCtrl from './todosgrupos.ctrl';


export default class TodosGrupos extends TodosGruposCtrl {
    form = { nombre: "" };
    render = () => {
        const {store} = this.props;
        const groups = store.getState().groupsAll || [];
        return (
            <div>
                <Form onSubmit={this.onHandlerSearch}>
                    <Form.Field>
                        <Form.Input
                            placeholder="Encuentra grupos"
                            value={this.form.nombre} 
                            onChange={this.onHandlerChange} 
                            name="nombre" />
                    </Form.Field>
                </Form>
                <br />
                <div>
                    <Item.Group>
                        {groups.map((value, index) => {
                            var src = store.getState().config.api + "/groups/" + value.nombre + "/preview";
                            return (
                                <Item key={index}>
                                    <Item.Image size='tiny' src={src} />
                                    <Item.Content>
                                        <Item.Header as='a' onClick={this.handlerGo} href={'/groups/' + value.nombre}>
                                            {value.nombre}
                                        </Item.Header>
                                        <Item.Description>
                                            {value.descripcion}
                                        </Item.Description>
                                        <Item.Extra>Creado {moment(value.create_at).format("MMM Do YYYY h:mm:ss a")}</Item.Extra>
                                    </Item.Content>
                                </Item>
                            );
                        })}
                    </Item.Group>
                </div>
            </div>
        )
    }
}
