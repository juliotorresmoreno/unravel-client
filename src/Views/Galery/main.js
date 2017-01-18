import React from 'react';

//import { Button } from 'semantic-ui-react';

import GaleryCtrl from './main.ctrl';
import Create from './create';
import View from './galery';
import List from './list';
import Loading from '../Loading/main';

export default class Galery extends GaleryCtrl {
    isLoading = false;
    constructor(args) {
        super(args);
        const route  = this.props.route;
        this.props.store.subscribe(this, ['galery'], "Galery");
        if (!this.props.store.getState().galeria)
            this.props.store.getState().galeria = {};
        if (route.path === "galery") {
            this.props.store.galery.getGalerys()
                .then((data) => {
                    this.isLoading = false;
                    this.mounted ? this.forceUpdate(): void(0);
                })
                .catch((error) => console.log(error));
            this.isLoading = true;
        }
    }
    render = function() {
        const params = this.props.params;
        const store  = this.props.store;
        const route  = this.props.route;
        const router = this.props.router;
        const galery = this.props.params.galery;
        if (this.isLoading) {
            return <Loading />;
        } else if (route.path === "galery") {
            return <List params={params} store={store} route={route} router={router} />
        } else if (galery) {
            return <View params={params} store={store} route={route} router={router} />;
        }
        /*if (this.isLoading) {
            return <Loading />;
        } else if (galery) {
            return <View params={params} store={store} route={route} router={router} />;
        } else if (galerias.length === 0) {
            return <Create params={params} store={store} route={route} router={router} />;
        } else {
            return (
                <View params={params} store={store} route={route} router={router} />
            )
        }*/
    }
}