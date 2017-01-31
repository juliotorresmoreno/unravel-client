import React from 'react';

import { Button } from 'semantic-ui-react';
import EditorImageCtrl from './editorImage.ctrl';

export default class EditorImage extends EditorImageCtrl {
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
        if(this.props.editar === false)
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
                    <Button primary onClick={this.handlerUpload}>{guardar}</Button>
                    <Button primary onClick={this.props.onCancel}>{terminar}</Button>
                </div>:null}
                <br />
                <canvas onMouseMove={this.onmousemove} onMouseDown={this.onmousedown}
                    style={{position: "absolute", zIndex: 200}} 
                    id="canvasO"></canvas>
                <canvas id="canvas" style={{width: "870px"}} />
            </div>
        );
    }
}

//onMouseUp={this.onmouseup} 