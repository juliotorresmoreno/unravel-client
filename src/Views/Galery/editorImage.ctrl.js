import React from 'react';
const { Component } = React;



export default class EditorImageCtrl extends Component {
    onmousemove = (e) => {
        if(e.buttons !== 1 || this.props.editar === false)
            return;
        var rect = this.canvas.getBoundingClientRect();
        var {clientX, clientY} = e;
        var cheight = this.canvas.clientHeight,
            cwidth = this.canvas.clientWidth,
            iheight = this.canvas.height, 
            iwidth = this.canvas.width,
            cleft = rect.left,
            ctop = rect.top,
            etop = clientY - ctop,
            eleft = clientX - cleft,
            nleft = iwidth / cwidth * eleft,
            ntop = iheight / cheight * etop,
            tamano = this.getTamano(),
            rleft = nleft - (tamano / 2),
            rtop = ntop - (tamano / 2),
            limitX = iwidth - tamano,
            limitY = iheight - tamano,
            pleft = rleft > 0 ? rleft: 0,
            ptop = rtop > 0 ? rtop: 0;

        this.left = pleft < limitX ? pleft: limitX;
        this.top = ptop < limitY ? ptop: limitY;
        this.fillSelection();
    };
    clearSelection() {
        this.ctxO.clearRect(this.left, this.top, this.getTamano(), this.getTamano());
    }
    fillSelection() {
        var iheight = this.canvas.height,
            iwidth = this.canvas.width;
        this.ctxO.clearRect(0, 0, iwidth, iheight);
        this.ctxO.fillStyle = "rgba(100, 100, 100, .5)"
        this.ctxO.fillRect(this.left, this.top, this.getTamano(), this.getTamano());
    }
    getTamano() {
        return this.props.tamano || 300;
    };
    drawComponent() {
        const store = this.props.store;
        const api = store.getState().config.api;
        const url = this.props.url;
        const tamano = this.getTamano();
        const editar = this.props.editar;
        var img = new Image;
        img.onload = () => {
            var iheight = img.height;
            var iwidth  = img.width;
            var cwidth  = this.canvas.clientWidth || this.canvas.innerWidth;
            this.canvas.height = iheight;
            this.canvas.width = iwidth;
            this.canvas.style.height = (iheight / iwidth * cwidth) + "px";
            var cheight  = this.canvas.clientHeight || this.canvas.innerHeight;
            this.widthImage = iwidth;
            this.heightImage = iheight;
            this.ctx.drawImage(img, 0, 0, iwidth, iheight);

            if (editar) {
                this.left = this.left || (cwidth + tamano) / 2;
                this.top = this.top || (cheight) / 2;
                this.fillSelection();
            }
        };
        img.src = url;
        this.image = img;
    }
}