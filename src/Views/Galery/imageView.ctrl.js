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
        const store = this.props.store;
        const session = this.props.store.location.getSession(this.props.params.user);
        const isMe = session.usuario === store.getState().session.usuario;
        const luser = !isMe ? '/' + session.usuario: '';
        const image = this.props.params.image;
        const galeria = this.props.params.galery;
        const images = this.props.store.getState().images;
        if (images.galery !== galeria)
            return;
        const items = images.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i] !== image)
                continue;
            if (i === items.length - 1) {
                this.props.router.push(luser + "/galery/" + galeria + "/" + items[0]);
                return;
            }
            this.props.router.push(luser + "/galery/" + galeria + "/" + items[i + 1]);
            return;
        }
    };
    handlePrev = (e, obj) => {
        const store = this.props.store;
        const session = this.props.store.location.getSession(this.props.params.user);
        const isMe = session.usuario === store.getState().session.usuario;
        const luser = !isMe ? '/' + session.usuario: '';
        const image = this.props.params.image;
        const galeria = this.props.params.galery;
        const images = this.props.store.getState().images;
        if (images.galery !== galeria)
            return;
        const items = images.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i] !== image)
                continue;
            if (i === 0) {
                this.props.router.push(luser + "/galery/" + galeria + "/" + items[items.length - 1]);
                return;
            }
            this.props.router.push(luser + "/galery/" + galeria + "/" + items[i - 1]);
            return;
        }       
    };
}