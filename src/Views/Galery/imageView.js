import React from 'react';

import { Header, Button } from 'semantic-ui-react';

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
        const url = api + "/galery/" + galery + "/" + image + "?token=" + store.getState().session.token;
        return (
            <div>
                <Header as="h2">{galery}</Header>
                {!this.editar?<Button primary onClick={this.handleEstablecer}>{establecer}</Button>:null}
                <EditorImage
                    store={store}
                    onUpload={this.handlerUpload}
                    onCancel={this.handleCancelar}
                    editar={this.editar} url={url} />
            </div>
        );
    }
}