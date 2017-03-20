import React from 'react';

const { Component } = React;

export default class ModalCtrl extends Component {
    handleClose = (e) => {
        this.props.store.setState({ content: '' });
    }
}