import React from 'react';

import { Header, Button } from 'semantic-ui-react';

import ImageViewCtrl from './imageView.ctrl';
import EditorImage from './editorImage';

export default class ImageView extends ImageViewCtrl {
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
        const establecer = store.lang.get("galeria_establecer");
        const eliminar = store.lang.get("app_eliminar");
        const url = api + "/galery/" + galery + "/" + image;
        return (
            <div>
                <Header as="h2">
                    <a href={"/galery/" + galery} onClick={this.go}>{galery}</a>
                </Header>
                {!this.editar ? <Button primary onClick={this.handleEstablecer}>{establecer}</Button>: null}
                {!this.editar ? <Button negative onClick={this.handleEliminar}>{eliminar}</Button>: null}
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