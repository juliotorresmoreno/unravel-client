import React from 'react';

import { Grid, Image, Card, Button } from 'semantic-ui-react';

import listGalerysCtrl from './listGalerys.ctrl';

export default class listGalerys extends listGalerysCtrl {
    constructor(args) {
        super(args);
        const session = this.props.store.location.getSession(this.props.params.user);
        this.props.store.galery.getGalerys(session.usuario)
            .then((data) => {
                this.isLoading = false;
                this.mounted ? this.forceUpdate(): void(0);
            })
            .catch((error) => console.log(error));
        this.isLoading = true;
    }
    componentDidMount = () => {
        this.mounted = true;
    }
    componentWillUnmount = () => {
        this.mounted = false;
    }
    handlerGo = url => e => {
        e.preventDefault();
        this.props.router.push(url);
    }
    render = () => {
        const session = this.props.store.location.getSession(this.props.params.user);
        const store = this.props.store;
        const galerys = store.getState().galerys || [];
        const isMe = session.usuario === store.getState().session.usuario;
        const api = store.getState().config.api;
        const luser = !isMe ? '/' + session.usuario: '';
        const urlCrear = "/galery/create";
        var divCrear = null;
        if (isMe) {
            divCrear = (
                <div>
                    <div>
                        <Button primary as="a" href={urlCrear} onClick={this.handlerGo(urlCrear)}>Crear</Button>
                    </div>
                    <br />
                </div>
            );
        }
        return (
            <div>
                {divCrear}
                <Grid doubling columns={4}>
                    {galerys.map((galeria, index) => {
                        const url = api + "/" + session.usuario + "/galery/" + galeria.name + "/preview";
                        const href = luser + "/galery/" + encodeURI(galeria.name);
                        return (
                            <Grid.Column as="a" onClick={this.handlerGo(href)} href={href} key={index}>
                                <Card>
                                    <Image src={url} />
                                    <Card.Content>
                                        <Card.Header>
                                            {galeria.name}
                                        </Card.Header>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </div>
        )
    }
}