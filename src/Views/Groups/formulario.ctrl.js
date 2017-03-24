import React from 'react';
const { Component } = React;

var file;

export default class FormularioCtrl extends Component {
    constructor(args) {
        super(args);
        this.newFile();
    }
    newFile = () => {
        file = document.createElement("input");
        file.type = "file";
        file.accept = ".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*";
        file.multiple = false;
        file.onchange = this.onchange;
    }
    onHandlerGuardar = (e, obj, permiso) => {
        var store = this.props.store;
        var data = this.form;
        data.permiso = permiso;
        store.groups.save(data)
            .then(e => this.props.router.push('/groups'))
            .catch((error) => {
                store.setState({error: error});
            });
    }
    onHandlerChange = (e, obj) => {
        this.form[obj.name] = obj.value;
        this.forceUpdate();
    }
    onchange = () => {
        if (file.files.length === 0)
            return;
        var reader = new FileReader();
        reader.onload = e => 
            this.setState({open: true, src: e.target.result});
        reader.readAsDataURL(file.files[0]);
        this.newFile();
    };
    onHandlerRecortar = () => {
        const canvas = this.refs.capture.getSelection();
        const { params, store } = this.props;
        canvas.toBlob((blob) => {
            var data = new FormData();
            data.append("file", blob);
            data.append("group", store.getState().group.ID);
            store.groups.changePreview(data);
        });
        this.src = canvas.toDataURL("image/jpeg");
        this.setState({open: false});
        const url = store.getState().config.api + "/groups/" + params.group + "/preview";
        fetch(url, {
            method: "GET",
            credentials: "include", 
            mode: "cors"
        });
    }
    onHandlerImagen = (e, obj) => {
        e.preventDefault();
        file.click();
    }
}