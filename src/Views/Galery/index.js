import React from 'react';

import GaleryCtrl from './index.ctrl';
import GaleryView from './galeryView';
import ImageView from './imageView';
import Create from './create';
import ListGalerys from './listGalerys';
import Loading from '../Loading';

export default class Galery extends GaleryCtrl {
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['galery', 'images'], "Galery");
    }
    render = () => {
        const {params, store, route, router, routes} = this.props;
        const path = this.props.routes[1].path;
        switch (path) {
            case "galery/create": case "galery/:galery/editar":
                return <Create params={params} store={store} routes={routes} route={route} router={router} />;
            case "galery": case ":user/galery":
                return <ListGalerys params={params} store={store} routes={routes} route={route} router={router} />;
            case "galery/:galery": case ":user/galery/:galery":
                return <GaleryView params={params} store={store} routes={routes} route={route} router={router} />;
            case "galery/:galery/:image": case ":user/galery/:galery/:image":
                return <ImageView params={params} store={store} routes={routes} route={route} router={router} />;
            default:
                return <Loading />;
        }
    }
}