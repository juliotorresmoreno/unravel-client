import React from 'react';

import { Image } from 'semantic-ui-react';

import ImageViewCtrl from './imageView.ctrl';

export default class ImageView extends ImageViewCtrl {
    componentWillMount = () => {
        this.props.store.galery.getImages(this.props.params.galery, false)
            .then((data) => {
                this.isLoading = false;
                this.mounted ? this.forceUpdate(): void(0);
            })
            .catch((error) => console.log(error));
        this.isLoading = true;
        this.mounted = true;
    }
    render = () => {
        const store  = this.props.store;
        const params = this.props.params || {};
        const {galery, image} = {params};
        const images = store.getState().images && store.getState().images.galery === galery ? 
                        store.getState().images.items: [];
        const api = store.getState().config.api;
        return <Image src={api + "/galery/" + galery + "/" + image} />;
    }
}