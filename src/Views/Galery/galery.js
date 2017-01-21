import React from 'react';

import { Image, Button, Header, Grid } from 'semantic-ui-react';

import GaleryCtrl from './index.ctrl';

export default class Galery extends GaleryCtrl {
    form = {nombre: ""};
    files = [];
    constructor(args) {
        super(args);
        var file = document.createElement("input");
        file.type   = "file";
        file.accept = ".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*";
        file.multiple = true;
        file.onchange = (e) => {
            var files = [];
            for (let i = 0; i < file.files.length; i++) {
                let reader = new FileReader();
                reader.onload = (() => (e) => {
                    files.push({name: file.files[i].name, src: e.target.result});
                    if (files.length === file.files.length) {
                        this.files = files;
                        this.forceUpdate();
                    }
                })();
                reader.readAsDataURL(file.files[i]);
            }
        }
        this.file = file;
    }
    componentWillMount = () => {
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
        this.props.store.getState().images = [];
    }
    render = () => {
        const params = this.props.params || {};
        const galery = params.galery;
        const images = this.props.store.getState().images || [];
        const api = this.props.store.getState().config.api;
        return (
            <div>
                <div>
                    <Header as="h2">{galery}</Header>
                    {(() => {
                        if (this.files.length === 0)
                            return <Button primary onClick={this.handleSeleccionar}>Selecciona</Button>;
                        return <Button primary onClick={this.handleSubir}>Subir</Button>;
                    })()}
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
                        return (
                            <Grid.Column as="a" onClick={(e) => e.preventDefault()} href={"/galery/" + galery + "/" + value} key={index}>
                                <Image src={api + "/galery/" + galery + "/" + value} />
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </div>
        );
    }
}