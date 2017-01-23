import React from 'react';

import { Image, Button, Header, Grid } from 'semantic-ui-react';

import GaleryViewCtrl from './galeryView.ctrl';

export default class GaleryView extends GaleryViewCtrl {
    form = {nombre: ""};
    files = [];
    componentWillMount = () => {
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
                        this.forceUpdate();
                    }
                })();
                reader.readAsDataURL(this.file.files[i]);
            }
        }
        this.props.store.galery.getImages(this.props.params.galery)
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
    render = () => {
        const store  = this.props.store;
        const params = this.props.params || {};
        const galery = params.galery;
        const images = store.getState().images && store.getState().images.galery === galery ? 
                        store.getState().images.items: [];
        const api = store.getState().config.api;
        const selecciona = store.lang.get("galeria_selecciona");
        const subir = store.lang.get("galeria_subir");
        return (
            <div>
                <div>
                    <Header as="h2">{galery}</Header>
                    {this.files.length === 0 ?
                        <Button primary onClick={this.handleSeleccionar}>{selecciona}</Button>:
                        <Button primary onClick={this.handleSubir}>{subir}</Button>}
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
                        const url = "/galery/" + galery + "/" + value;
                        const src = api + "/galery/" + galery + "/" + value +
                                "?token=" + store.getState().session.token;
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