import React from 'react';

import { Header, Modal, Button } from 'semantic-ui-react';
import ErrorCtrl from './index.ctrl';

export default class Error extends ErrorCtrl {
    handleClose = (e) => this.props.store.setState({ error: '' });
    render = () => {
        const aceptar = this.props.store.lang.get('app_aceptar');
        return (
            <Modal open={this.props.error!==""} onClose={this.handleClose} size='small'>
                <Header content='Error' />
                <Modal.Content>
                    <h3>{this.props.error}</h3>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={this.handleClose}>
                    {aceptar}
                </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}