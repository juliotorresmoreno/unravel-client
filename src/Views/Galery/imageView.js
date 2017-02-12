import React from 'react';

import { Header, Button, Modal } from 'semantic-ui-react';

import ImageViewCtrl from './imageView.ctrl';
import EditorImage from './editorImage';

export default class ImageView extends ImageViewCtrl {
    state = { open: false }
    editar = false;
    componentWillMount = () => {
        var session = this.props.store.location.getSession(this.props.params.user);
        this.props.store.galery.getImages(session.usuario, this.props.params.galery)
            .then((data) => {
                this.isLoading = false;
                this.mounted ? this.forceUpdate(): void(0);
            })
            .catch((error) => console.log(error));
        this.isLoading = true;
        this.mounted = true;
    }
    go = (e, obj) => {
        e.preventDefault();
        this.props.router.push(e.target.href.replace(/^http(s){0,1}:\/\/[^\/]*/, ""));
    }
    render = () => {
        const
            store  = this.props.store,
            params = this.props.params || {},
            galery = params.galery,
            image  = params.image;
        const api = store.getState().config.api;
        const pregunta_delete = store.lang.get("galeria_pregunta_eliminar_foto");
        const title_delete = store.lang.get("galeria_titulo_eliminar_foto");
        const establecer = store.lang.get("galeria_establecer");
        const eliminar = store.lang.get("app_eliminar");
        const session = this.props.store.location.getSession(this.props.params.user);
        const isMe = session.usuario === store.getState().session.usuario;
        const luser = !isMe ? '/' + session.usuario: '';
        const url = api + luser + "/galery/" + galery + "/" + image;
        var buttons = null;
        if (isMe && !this.editar) {
            buttons = (
                <div>
                    <Button primary onClick={this.handleEstablecer}>{establecer}</Button>
                    <Button negative onClick={this.handleEliminar}>{eliminar}</Button>
                </div>
            );
        }
        return (
            <div>
                <Header as="h2">
                    <a href={luser + "/galery/" + galery} onClick={this.go}>{galery}</a>
                </Header>
                {buttons}
                <Modal size='small' open={this.state.open} onClose={this.handleCancelEliminar}>
                    <Modal.Header>{title_delete}</Modal.Header>
                    <Modal.Content>
                        <p>{pregunta_delete}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive onClick={this.handleCancelEliminar}>
                            No
                        </Button>
                        <Button negative onClick={this.handleConfirmEliminar}>
                            Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
                <EditorImage
                    store={store} params={params}
                    onUpload={this.handlerUpload}
                    onCancel={this.handleCancelar}
                    onNext={this.handleNext}
                    onPrev={this.handlePrev}
                    editar={this.editar} url={url} />
                <br />
            </div>
        );
    }
}