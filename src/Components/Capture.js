import React, { Component } from 'react';
const $ = window.jQuery;


const maximo = 250;
const canvasStyle = {
    padding: 0,
    height: maximo + "px"
};
const selectorStyle = Object.assign({}, canvasStyle, {
    position: "absolute",
    zIndex: 200,
    cursor: 'move'
});
var imagen;

export default class Capture extends Component {
    componentDidMount = () => {
        this.drawImage();
    }
    drawImage = () => {
        var selector = this.refs.selector;
        var canvas = this.refs.canvas;
        imagen = new Image();
        imagen.crossOrigin = "use-credentials";
        imagen.onload = () => {
            var width, height;
            var etop = 0, eleft = 0;
            if (width > height) {
                width = maximo / imagen.height * imagen.width;
                eleft = (width - maximo) / 2;
                height = maximo;
            } else { 
                height = maximo / imagen.width * imagen.height;
                etop = (height - maximo) / 2;
                width = maximo;
            }
            var context = canvas.getContext("2d");
            $(canvas).css('width', width + "px");
            canvas.width = width;
            $(selector).css('width', width + "px");
            selector.width = width;
            context.drawImage(imagen, 0, 0, width, height);
            
            this.fillSelection(eleft, etop);
        };
        imagen.src = this.props.src;
    }
    clearSelection() {
        var selector = this.refs.selector;
        var context = selector.getContext("2d");
        var iwidth = selector.width,
            iheight = selector.height;
        context.clearRect(0, 0, iwidth, iheight);
    }
    getLocation = (clientX, clientY) => {
        var canvas = this.refs.canvas;
        var rect = canvas.getBoundingClientRect();
        var cheight = canvas.clientHeight,
            cwidth = canvas.clientWidth,
            iheight = imagen.height, 
            iwidth = imagen.width,
            cleft = rect.left,
            ctop = rect.top,
            etop = clientY - ctop,
            eleft = clientX - cleft,
            nleft = iwidth / cwidth * eleft,
            ntop = iheight / cheight * etop;
        return {top: ntop, left: nleft, etop, eleft};
    }
    handlerMouseMove = (e, obj) => {
        if (e.buttons !== 1)
            return;
        var selector = this.refs.selector;
        var { eleft, etop } = this.getLocation(e.clientX, e.clientY);
        var left, top;
        if (imagen.width > imagen.height) {
            left = eleft - maximo / 2;
            top  = 0;
            if (left < 0) {
                left = 0;
            } else if (left + maximo / 2 > selector.width - maximo / 2) {
                left = selector.width - maximo;
            }
        } else {
            top  = etop - maximo / 2;
            left = 0;
            if (top < 0) {
                top = 0;
            }
        }
        this.clearSelection();
        this.fillSelection(left, top);
    }
    fillSelection = (left, top) => {
        var selector = this.refs.selector;
        var context = selector.getContext("2d");
        this.top = top;
        this.left = left;
        context.fillStyle = "rgba(100, 100, 100, .5)";
        context.fillRect(left, top, maximo, maximo);
    }
    getSelection = () => {
        var canvas = this.refs.canvas; //document.createElement('canvas');
        var context = canvas.getContext("2d");
        var left = imagen.width / canvas.width * this.left;
        var top = imagen.height / canvas.height * this.top;
        var tamano = imagen.width / canvas.width * maximo;
        canvas.width = maximo;
        canvas.height = maximo;
        canvas.style.width = '';
        canvas.style.height = '';
        context.drawImage(imagen, left, top, tamano, tamano, 0, 0, maximo, maximo);
        return canvas;
    }
    render = () => {
        return (
            <span>
                <canvas ref="selector" 
                        onMouseMove={this.handlerMouseMove} 
                        width={maximo*2} 
                        height={maximo} 
                        style={selectorStyle} />
                <canvas ref="canvas" 
                        width={maximo*2} 
                        height={maximo} 
                        style={canvasStyle} />
            </span>
        );
    }
}