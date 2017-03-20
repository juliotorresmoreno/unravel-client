import React from 'react';

import { Header, Modal, Button } from 'semantic-ui-react';
import ModalCtrl from './index.ctrl';

export default class VentanaModal extends ModalCtrl {
    render = () => {
        const aceptar = this.props.store.lang.get('app_aceptar');
        const content = this.props.content;
        return (
            <Modal open={content!==''} onClose={this.handleClose} size='small'>
                <Header content='Informacion' />
                <Modal.Content>
                    <h3>{content}</h3>
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