import React from 'react';

import { Button } from 'semantic-ui-react';
import EditorImageCtrl from './editorImage.ctrl';

export default class EditorImage extends EditorImageCtrl {
    componentDidMount = () => {
        this.editar = this.props.editar;
        this.canvas = document.getElementById("canvas");
        this.canvasO = document.getElementById("canvasO");
        this.ctx = this.canvas.getContext('2d');
        this.ctxO = this.canvasO.getContext('2d');
        this.drawComponent();            
    }
    componentDidUpdate = () => {
        if(this.props.editar === false) {
            this.clearSelection();
        } else {
            this.drawComponent();
        }
    }
    render = function() {
        const store    = this.props.store;
        const guardar  = store.lang.get("app_save");
        const cancelar = store.lang.get("app_cancel");
        return (
            <div>
                {this.props.editar?<div>
                    <Button primary onClick={this.handlerUpload}>{guardar}</Button>
                    <Button primary onClick={this.props.onCancel}>{cancelar}</Button>
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