import React from 'react';
const { Component } = React;


export default class VideoLlamadaCtrl extends Component {
    onHandlerAceptar = (e, obj) => {

    }
    onHandlerRechazar = (e, obj) => {
        e.preventDefault();
        this.setState({rechazado: true});
    }
}