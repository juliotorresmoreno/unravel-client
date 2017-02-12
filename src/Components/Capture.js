import React, { Component } from 'react';
import $ from 'jquery';


const maximo = 250;
const canvasStyle = {
    //marginLeft: "50%",
    //transform: "translateX(-50%)",
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
            var width  = imagen.width;
            var height = imagen.height;
            var etop = 0, eleft = 0;
            if (width > height) {
                width = maximo / height * width;
                eleft = (width - maximo) / 2;
                height = maximo;
            } else {
                height = maximo / width * height;
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

        if (imagen.width > imagen.height) {
            eleft = eleft - maximo / 2;
            etop  = 0;
            if (eleft < 0)
                eleft = 0;
            if (eleft + maximo / 2 > selector.width - maximo / 2)
                eleft = selector.width - maximo;
        } else {
            etop  = etop - maximo / 2;
            eleft = 0;
            if (etop < 0)
                etop = 0;
        }
        this.clearSelection();
        this.fillSelection(eleft, etop);
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