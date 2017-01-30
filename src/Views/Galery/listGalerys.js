import React from 'react';

import { Grid, Image, Card, Button } from 'semantic-ui-react';

import listGalerysCtrl from './listGalerys.ctrl';

export default class listGalerys extends listGalerysCtrl {
    constructor(args) {
        super(args);
        var session = this.getSession();
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
    go = (name, luser) => (e) => {
        e.preventDefault();
        this.props.router.push((luser ? "/" + luser: "") + "/galery/" + encodeURI(name));
    }
    getSession = () => {
        if (this.props.params.user && this.props.store.getState().usuario)
            return this.props.store.getState().usuario;
        return this.props.store.getState().session;
    }
    render = () => {
        const session = this.getSession();
        const store = this.props.store;
        const galerys = store.getState().galerys || [];
        const isMe = session.usuario === store.getState().session.usuario;
        const api = store.getState().config.api;
        const luser = !isMe ? '/' + session.usuario: '';
        return (
            <div>
                <div>
                    {<Button primary as="a" href="/galery/create" onClick={this.go("create")}>Crear</Button>}
                </div>
                <br />
                <Grid doubling columns={4}>
                    {galerys.map((galeria, index) => {
                        const url = api + "/" + session.usuario + "/galery/" + galeria.name + "/preview?token=" + store.getState().session.token;
                        const href = luser + "/galery/" + encodeURI(galeria.name);
                        return (
                            <Grid.Column as="a" onClick={this.go(galeria.name, luser)} href={href} key={index}>
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