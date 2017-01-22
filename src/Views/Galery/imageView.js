import React from 'react';

import { Image, Header, Button } from 'semantic-ui-react';
import AvatarEditor from 'react-avatar-editor';

import ImageViewCtrl from './imageView.ctrl';
import EditorImage from './editorImage';

export default class ImageView extends ImageViewCtrl {
    editar = false;
    componentWillMount = () => {
        this.props.store.galery.getImages(this.props.params.galery, false)
            .then((data) => {
                this.isLoading = false;
                this.mounted ? this.forceUpdate(): void(0);
            })
            .catch((error) => console.log(error));
        this.isLoading = true;
        this.mounted = true;
    }
    render = () => {
        const
            store  = this.props.store,
            params = this.props.params || {},
            galery = params.galery,
            image  = params.image;
        const api = store.getState().config.api;
        const establecer = store.lang.get("galeria_establecer");
        const guardar = store.lang.get("app_save");
        const cancelar = store.lang.get("app_cancel");
        const url = api + "/galery/" + galery + "/" + image + "?token=" + store.getState().session.token;
        var children, buttons;
        if (this.editar) {
            buttons = (
                <div>
                    <Button primary>{guardar}</Button>
                    <Button primary onClick={this.handleCancelar}>{cancelar}</Button>
                </div>
            );
        } else {
            buttons = <Button primary onClick={this.handleEstablecer}>{establecer}</Button>;
        }
        return (
            <div>
                <div>
                    <Header as="h2">{galery}</Header>
                    {buttons}
                </div>
                <br />
                <EditorImage store={store} editar={this.editar} url={url} />
            </div>
        );
    }
}