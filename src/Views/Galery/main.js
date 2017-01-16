import React from 'react';

import { Button } from 'semantic-ui-react';

import GaleryCtrl from './main.ctrl';
import Create from './create';
import View from './galery';

export default class Galery extends GaleryCtrl {
    constructor(args) {
        super(args);
        if(!this.props.store.getState().galeria)
            this.props.store.getState().galeria = {};
    }
    render = function() {
        const galerias = this.props.store.getState().galerias || [];
        const params = this.props.params;
        const store  = this.props.store;
        const route  = this.props.route;
        const router = this.props.router;
        const galery = this.props.params.galery;
        if (galery) {
            return <View params={params} store={store} route={route} router={router} />;
        }
        if (galerias.length === 0) {
            return <Create params={params} store={store} route={route} router={router} />;
        }
        return (
            <Button primary>Crear</Button>
        )
    }
}