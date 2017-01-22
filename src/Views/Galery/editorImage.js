import React from 'react';

import { Form, Header } from 'semantic-ui-react';
import EditorImageCtrl from './editorImage.ctrl';

export default class EditorImage extends EditorImageCtrl {
    componentDidMount = () => {
        this.canvas = document.getElementById("canvas");
        this.canvasO = document.getElementById("canvasO");
        this.ctx = this.canvas.getContext('2d');
        this.ctxO = this.canvasO.getContext('2d');
        this.drawComponent();
    }
    componentDidUpdate = () => {
        this.drawComponent();
    }
    render = function() {
        return (
            <div>
                <canvas onMouseMove={this.onmousemove}
                    height="768" 
                    width="1366"
                    style={{width: "870px", height: "489.136px", position: "absolute", zIndex: 200}} 
                    id="canvasO"></canvas>
                <canvas id="canvas" style={{width: "870px"}} />
            </div>
        );
    }
}