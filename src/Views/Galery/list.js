import React from 'react';

import { Grid, Image, Card, Icon } from 'semantic-ui-react';

import ListCtrl from './list.ctrl';

export default class List extends ListCtrl {
    go = (name) => {
        return (e) => {
            e.preventDefault();
            this.props.router.push("/galery/" + encodeURI(name));
        }
    }
    render = () => {
        const {galerys} = this.props.store.getState();
        return (
            <div>
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