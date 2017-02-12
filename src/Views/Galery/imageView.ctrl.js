import React from 'react';
const { Component } = React;

export default class ImageViewCtrl extends Component {
    handleSubir = (e, obj) => {
        this.editar = true;
        this.forceUpdate();
    }
    handleEliminar = () => this.setState({ open: true });
    handleCancelEliminar = () => this.setState({ open: false });
    handleConfirmEliminar = (e, obj) => {
        var {galery, image} = this.props.params;
        var store = this.props.store;
        this.setState({ open: false });
        return;
        store.galery.eliminar({image: image, galery: galery})
            .then(() => {
                this.props.router.push("/galery/" + galery);
            });
    };
    handleEstablecer = (e, obj) => {
        this.editar = true;
        this.forceUpdate();
    };
    handleCancelar = (e, obj) => {
        this.editar = false;
        this.forceUpdate();
    };
    handleNext = (e, obj) => {
        var image = this.props.params.image;
        var galeria = this.props.params.galery;
        var images = this.props.store.getState().images;
        if (images.galery !== galeria)
            return;
        var items = images.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i] !== image)
                continue;
            if (i === items.length - 1) {
                this.props.router.push("/galery/" + galeria + "/" + items[0]);
                return;
            }
            this.props.router.push("/galery/" + galeria + "/" + items[i + 1]);
            return;
        }
    };
    handlePrev = (e, obj) => {
        var image = this.props.params.image;
        var galeria = this.props.params.galery;
        var images = this.props.store.getState().images;
        if (images.galery !== galeria)
            return;
        var items = images.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i] !== image)
                continue;
            if (i === 0) {
                this.props.router.push("/galery/" + galeria + "/" + items[items.length - 1]);
                return;
            }
            this.props.router.push("/galery/" + galeria + "/" + items[i - 1]);
            return;
        }       
    };
}