import React from 'react';

import GaleryCtrl from './main.ctrl';
import View from './galery';
import ListGalerys from './listGalerys';
import Loading from '../Loading/main';

export default class Galery extends GaleryCtrl {
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['galery', 'images'], "Galery");
    }
    render = () => {
        const {params, store, route, router} = this.props;
        switch (route.path) {
            case "galery":
                return <ListGalerys params={params} store={store} route={route} router={router}/>;
            case "galery/:galery":
                return <View params={params} store={store} route={route} router={router} />;
            default:
                return <Loading />;
        }
    }
}