import React from 'react';
const { Component } = React;

export default class ComentarioCtrl extends Component {
    onHandlerReply = (e, obj) => {
        if (typeof this.props.onResponder === "function") {
            this.props.onResponder(e, this, this.props.comentario || {});
        }
    }
}