import React from 'react';

import { Image, Button, Header, Grid } from 'semantic-ui-react';

import GaleryViewCtrl from './galeryView.ctrl';

export default class GaleryView extends GaleryViewCtrl {
    form = {nombre: ""};
    files = [];
    componentWillMount = () => {
        const session = this.getSession();
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
    getSession = () => {
        if (this.props.params.user && this.props.store.getState().usuario)
            return this.props.store.getState().usuario;
        return this.props.store.getState().session;
    }
    render = () => {
        const store  = this.props.store;
        const params = this.props.params || {};
        const galery = params.galery;
        const images = store.getState().images && store.getState().images.galery === galery ? 
                        store.getState().images.items: [];
        const api = store.getState().config.api;
        const selecciona = store.lang.get("galeria_selecciona");
        const subir = store.lang.get("galeria_subir");
        const session = this.getSession();
        const isMe = session.usuario === store.getState().session.usuario;
        const luser = !isMe ? '/' + session.usuario: '';
        const token = store.getState().session.token
        const actions = isMe ?
            this.files.length === 0 ?
                <Button primary onClick={this.handleSeleccionar}>{selecciona}</Button>:
                <Button primary onClick={this.handleSubir}>{subir}</Button>:
            null;
        return (
            <div>
                <div>
                    <Header as="h2">{galery}</Header>
                    {actions}
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
                        const url = luser + "/galery"+ "/" + galery+ "/" + value+ "?token=" + token;
                        const src = api + url + "&mini=1";
                        return (
                            <Grid.Column as="a" onClick={this.go(url)} href={url} key={index}>
                                <Image src={src} />
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </div>
        );
    }
}