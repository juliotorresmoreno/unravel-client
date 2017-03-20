import React from 'react';

import { Button } from 'semantic-ui-react';
import EditorImageCtrl from './editorImage.ctrl';

export default class EditorImage extends EditorImageCtrl {
    action = "";
    componentWillMount = () => {
        this.editar = this.props.editar;
    }
    componentWillUnmount = () => {
        this.mounted = false;
    }
    componentDidMount = () => {
        this.canvas = document.getElementById("canvas");
        this.canvasO = document.getElementById("canvasO");
        this.ctx = this.canvas.getContext('2d');
        this.ctxO = this.canvasO.getContext('2d');
        this.drawComponent();
        this.mounted = true;
    }
    componentWillUpdate = (data) => {
        this.editar = data.editar;
    }
    componentDidUpdate = () => {
        if(this.props.editar === false && this.action === "")
            this.clearSelection();
        this.editar = this.props.editar;
        this.drawComponent();
    }
    render = function() {
        const store    = this.props.store;
        const guardar  = store.lang.get("app_save");
        const terminar = store.lang.get("app_terminar");
        return (
            <div>
                {this.editar?<div>
                    <Button positive onClick={this.handlerUpload}>{guardar}</Button>
                    <Button primary onClick={this.props.onCancel}>{terminar}</Button>
                </div>:null}
                <br />
                <canvas
                    onClick={this.onclick} 
                    onMouseMove={this.onmousemove}
                    onMouseDown={this.onmousedown}
                    onMouseLeave={this.onmouseleave}
                    style={{position: "absolute", zIndex: 200}} 
                    id="canvasO"></canvas>
                <canvas id="canvas" style={{width: "100%"}} />
            </div>
        );
    }
}