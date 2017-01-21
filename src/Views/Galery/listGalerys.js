import React from 'react';

import { Grid, Image, Card, Button } from 'semantic-ui-react';

import listGalerysCtrl from './listGalerys.ctrl';

export default class listGalerys extends listGalerysCtrl {
    componentWillMount = () => {
        this.props.store.galery.getGalerys()
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
    go = (name) => (e) => { e.preventDefault(); this.props.router.push("/galery/" + encodeURI(name)); }
    render = () => {
        const galerys = this.props.store.getState().galerys || [];
        return (
            <div>
                <div>
                    {<Button primary as="a" href="/galery/create" onClick={this.go("create")}>Crear</Button>}
                </div>
                <br />
                <Grid doubling columns={4}>
                    {galerys.map((galeria, index) => {
                        return (
                            <Grid.Column as="a" onClick={this.go(galeria.name)} href={"/galery/" + encodeURI(galeria.name)} key={index}>
                                <Card>
                                    <Image src='/static/svg/user-3.svg' />
                                    <Card.Content>
                                        <Card.Header>
                                            {galeria.name}
                                        </Card.Header>
                                        <Card.Description>
                                            {galeria.descripcion}
                                        </Card.Description>
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