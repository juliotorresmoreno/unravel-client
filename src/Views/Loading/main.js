import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';

export default class Loading extends Component {
    render() {
        return (
            <Message icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                <Message.Header>Espere un momento</Message.Header>
                    Estamos cargando el contenido.
                </Message.Content>
            </Message>
        );
    }
}