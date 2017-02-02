import React from 'react';

import { Image, Button, Header, Grid } from 'semantic-ui-react';

import GaleryViewCtrl from './galeryView.ctrl';

export default class GaleryView extends GaleryViewCtrl {
    form = {nombre: ""};
    files = [];
    componentWillMount = () => {
        const session = this.props.store.location.getSession(this.props.params.user);
        this.file = document.createElement("input");
        this.file.type   = "file";
        this.file.accept = ".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*";
        this.file.multiple = true;
        this.file.onchange = (e) => {
            var files = [];
            for (let i = 0; i < this.file.files.length; i++) {
                let reader = new FileReader();
                reader.onload = (() => (e) => {
                    files.push({name: this.file.files[i].name, src: e.target.result});
                    if (files.length === this.file.files.length) {
                        this.files = files;
                        this.forceUpdate();                        
                    }
                })();
                reader.readAsDataURL(this.file.files[i]);
            }
        }
        this.props.store.galery.getImages(session.usuario, this.props.params.galery)
            .then((data) => {
                this.isLoading = false;
                this.mounted ? this.forceUpdate(): void(0);
            })
            .catch((error) => console.log(error));
        this.isLoading = true;
        this.mounted = true;
    }
    componentWillUnmount = () => {
        this.mounted = false;
    }
    go(href) {
        return (e) => {
            e.preventDefault();
            this.props.router.push(href);
        }
    }
    getActions = () => {
        const session = this.props.store.location.getSession(this.props.params.user);
        const store  = this.props.store;
        const isMe = session.usuario === store.getState().session.usuario;
        const selecciona = store.lang.get("galeria_selecciona");
        const tomar_foto = store.lang.get("galeria_tomar_foto");
        const editar = store.lang.get("galeria_editar");
        const subir = store.lang.get("galeria_subir");
        if (isMe === false) {
            return null;
        }
        if (this.files.length > 0)
            return <Button primary onClick={this.handleSubir}>{subir}</Button>;
        return [
            <Button primary key={0} onClick={this.handleSeleccionar}>{selecciona}</Button>,
            <Button primary key={1} onClick={this.handleTomarFoto}>{tomar_foto}</Button>,
            <Button primary key={2} onClick={this.handleEditar}>{editar}</Button>
        ];
    }
    render = () => {
        const store  = this.props.store;
        const params = this.props.params || {};
        const galery = params.galery;
        const images = store.getState().images && store.getState().images.galery === galery ? 
                        store.getState().images.items: [];
        const api = store.getState().config.api;
        const session = this.props.store.location.getSession(this.props.params.user);
        const isMe = session.usuario === store.getState().session.usuario;
        const luser = !isMe ? '/' + session.usuario: '';
        return (
            <div>
                <div>
                    <Header as="h2">{galery}</Header>
                    {this.getActions()}
                </div>
                <br />
                <Grid doubling columns={3}>
                    {this.files.map((value, index) => {
                        return (
                            <Grid.Column key={index}>
                                <Image key={index} src={value.src} />
                            </Grid.Column>
                        );
                    })}
                </Grid>
                <br />
                <Grid doubling columns={3}>
                    {images.map((value, index) => {
                        const url = luser + "/galery/" + galery+ "/" + value;
                        const src = api + url + "?mini=1";
                        return (
                            <Grid.Column as="a" onClick={this.go(url)} href={url} key={index}>
                                <Image src={src} />
                            </Grid.Column>
                        );
                    })}
                </Grid>
                <br />
            </div>
        );
    }
}