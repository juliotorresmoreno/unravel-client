import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

export default class WindowModal extends Component {
    render = () => {
        var actions = this.props.actions || [];
        return (
            <Modal size='small' open={this.props.open} onClose={this.props.onCancel}>
                <Modal.Header>{this.props.title}</Modal.Header>
                <Modal.Content>
                    <p>{this.props.children}</p>
                </Modal.Content>
                <Modal.Actions>
                    {actions}
                </Modal.Actions>
            </Modal>
        );
    }
}