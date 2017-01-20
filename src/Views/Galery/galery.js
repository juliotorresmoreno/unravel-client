import React from 'react';

import { Image, Button, Header, Grid } from 'semantic-ui-react';

import GaleryCtrl from './galery.ctrl';

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
    render = () => {
        const params = this.props.params || {};
        const galery = params.galery;
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
            </div>
        );
    }
}