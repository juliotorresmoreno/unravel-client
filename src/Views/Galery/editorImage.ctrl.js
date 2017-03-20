import React from 'react';
const { Component } = React;

export default class EditorImageCtrl extends Component {
    tamanoLinea = 20;
    getLocation = (e) => {
        var rect = this.canvas.getBoundingClientRect();
        var {clientX, clientY} = e,
            cheight = this.canvas.clientHeight,
            cwidth = this.canvas.clientWidth,
            iheight = this.canvas.height, 
            iwidth = this.canvas.width,
            cleft = rect.left,
            ctop = rect.top,
            etop = clientY - ctop,
            eleft = clientX - cleft,
            nleft = iwidth / cwidth * eleft,
            ntop = iheight / cheight * etop;
        return {top: ntop, left: nleft};
    }
    getRelacion = (e) => {
        var cwidth = this.canvas.clientWidth,
            iwidth = this.canvas.width,
            relacion = iwidth / cwidth;
        return relacion;
    }
    resize = (e) => {
        var {top, left} = this.getLocation(e),
            tamano = this.getTamano(),
            relacion = this.getRelacion(),
            tamanoLinea = this.tamanoLinea * relacion * 2,
            ntop  = top  - this.top,
            nleft = left - this.left,
            lX0 = -tamanoLinea / 2, lY0 = lX0,
            lY1 = tamano - lX0,
            lX1 = tamano - lX0,
            isTop = ntop >= lX0 && ntop <= lX0 + tamanoLinea,
            isLeft = nleft >= lY0 && nleft <= lY0 + tamanoLinea,
            isRight = nleft <= lY1 && nleft >= lY1 - tamanoLinea,
            isBotton = ntop <= lX1 && ntop >= lX1 - tamanoLinea,
            increment, operation, dleft, dtop;
        if (isTop && isLeft) {
            this.canvasO.style.cursor = "se-resize";
        } else if (isBotton && isRight) {
            this.canvasO.style.cursor = "nw-resize";
        } else if (isBotton && isLeft) {
            this.canvasO.style.cursor = "ne-resize";
        } else if (isTop && isRight) {
            this.canvasO.style.cursor = "sw-resize";
        } else {
            this.canvasO.style.cursor = "";
            return false;
        }
        if(e.buttons !== 1 || this.props.editar === false)
            return true;
        if (isTop && isLeft) {
            increment = Math.abs(ntop) > Math.abs(nleft) ? Math.abs(ntop): Math.abs(nleft);
            operation = Math.abs(ntop) > Math.abs(nleft) ? ntop / -increment: nleft / -increment;
            this.top = top;
            this.left = left;
            this.tamano = this.tamano + increment * operation;
            this.tamano = this.tamano < 200 ? 200: this.tamano;
            this.tamano = this.tamano > this.canvas.width ? this.canvas.width: this.tamano;
            this.tamano = this.tamano > this.canvas.height ? this.canvas.height: this.tamano;
        } else if (isTop && isRight) {
            dleft = nleft - tamano;
            increment = Math.abs(ntop) > Math.abs(dleft) ? Math.abs(ntop): Math.abs(dleft);
            operation = Math.abs(ntop) > Math.abs(dleft) ? ntop / -increment: dleft / -increment;
            this.top = top;
            this.tamano = this.tamano + increment * operation * -1;
            this.tamano = this.tamano < 200 ? 200: this.tamano;
        } else if (isBotton && isLeft) {
            dtop = ntop - tamano;
            increment = Math.abs(dtop) > Math.abs(nleft) ? Math.abs(dtop): Math.abs(nleft);
            operation = Math.abs(dtop) > Math.abs(nleft) ? dtop / -increment: nleft / -increment;
            this.left = left;
            this.tamano = this.tamano + increment * operation * -1;
            this.tamano = this.tamano < 200 ? 200: this.tamano;
        } else if (isBotton && isRight) {
            dleft = nleft - tamano;
            dtop = ntop - tamano;
            increment = Math.abs(dtop) > Math.abs(dleft) ? Math.abs(dtop): Math.abs(nleft);
            operation = Math.abs(dtop) > Math.abs(dleft) ? dtop / -increment: dleft / -increment;
            this.top = top - tamano;
            this.left = left - tamano;
        }
        this.fillSelection();
        return true;
    }
    move = (e) => {
        if(e.buttons !== 1 || this.props.editar === false)
            return;
        var {top, left} = this.getLocation(e);
        var iheight = this.canvas.height, 
            iwidth = this.canvas.width,
            tamano = this.getTamano(),
            rleft = left - (tamano / 2),
            rtop = top - (tamano / 2),
            limitX = iwidth - tamano,
            limitY = iheight - tamano,
            pleft =  rleft > 0 ? rleft: 0,
            ptop = rtop > 0 ? rtop: 0;
        
        this.left = pleft < limitX ? pleft: limitX;
        this.top = ptop < limitY ? ptop: limitY;
        this.fillSelection();
    }
    paginator = (e) => {
        if(e.buttons !== 0 || this.props.editar === true)
            return;
        var {left} = this.getLocation(e);
        var iwidth = this.canvas.width;
        var iheight = this.canvas.height;
        var min = iwidth * 0.2;
        var max = iwidth - min;
        this.ctxO.clearRect(0, 0, iwidth, iheight);
        this.canvasO.style.cursor = '';
        this.action = "";
        if (left <= min) {
            this.ctxO.fillStyle = "rgba(100, 100, 100, .2)"
            this.ctxO.fillRect(0, 0, min, iheight);
            this.canvasO.style.cursor = 'pointer';
            this.action = "prev";
        }
        if (left >= max) {
            this.ctxO.fillStyle = "rgba(100, 100, 100, .2)"
            this.ctxO.fillRect(max, 0, min, iheight);
            this.canvasO.style.cursor = 'pointer';
            this.action = "next";
        }
    }
    onclick = (e) => {
        if(this.props.editar === true)
            return;
        if (this.action === "next" && typeof this.props.onNext === "function") {
            this.props.onNext(e, this);
        }
        if (this.action === "prev" && typeof this.props.onPrev === "function") {
            this.props.onPrev(e, this);
        }
    }
    onmouseleave = (e) => {
        if (this.props.editar === false) this.clearSelection();
    }
    onmousemove = (e) => {
        this.move(e);
        this.paginator(e);
    }
    clearSelection() {
        var iwidth = this.canvas.width,
            iheight = this.canvas.height;
        this.ctxO.clearRect(0, 0, iwidth, iheight);
    }
    setearTamano(tamano) {
        var iwidth = this.canvas.width,
            cwidth = this.canvas.clientWidth,
            cheight = this.canvas.clientHeight,
            iheight = this.canvas.height,             
            relacion = iwidth / cwidth,
            _tamano = tamano > iwidth ? iwidth: tamano;
            _tamano = _tamano > cwidth ? cwidth: _tamano;
            _tamano = _tamano > iheight ? iheight: _tamano;
            _tamano = _tamano > cheight ? cheight: _tamano;
        this.tamano = _tamano * relacion;
    }
    fillSelection() {
        var top  = this.top,
            left = this.left,
            iheight = this.canvas.height,
            iwidth = this.canvas.width,
            relacion = this.getRelacion(),
            tamano = this.getTamano();
        this.ctxO.clearRect(0, 0, iwidth, iheight);
        this.ctxO.fillStyle = "rgba(100, 100, 100, .5)"
        this.ctxO.fillRect(left, top, tamano, tamano);

        var tamanoLinea = this.tamanoLinea * relacion;
        
        this.ctxO.strokeStyle = "blue";
        this.ctxO.lineWidth = 3;
        this.ctxO.beginPath();
        this.ctxO.moveTo(left, top + tamanoLinea);
        this.ctxO.lineTo(left, top);
        this.ctxO.lineTo(left + tamanoLinea, top);

        this.ctxO.moveTo(left + tamano, top + tamanoLinea);
        this.ctxO.lineTo(left + tamano, top);
        this.ctxO.lineTo(left + tamano - tamanoLinea, top);

        this.ctxO.moveTo(left + tamanoLinea, top + tamano);
        this.ctxO.lineTo(left, top + tamano);
        this.ctxO.lineTo(left, top + tamano - tamanoLinea);

        this.ctxO.moveTo(left + tamano - tamanoLinea, top + tamano);
        this.ctxO.lineTo(left + tamano, top + tamano);
        this.ctxO.lineTo(left + tamano, top + tamano - tamanoLinea);

        this.ctxO.stroke();
    }
    handlerUpload = () => {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var tamano = this.getTamano();
        this.clearSelection();
        this.editar = false;
        canvas.width = tamano;
        canvas.height = tamano;
        canvas.style.width = tamano + "px";
        canvas.style.height = tamano + "px";
        this.editar = false;
        this.forceUpdate();
        context.drawImage(this.image, this.left, this.top, tamano, tamano, 0, 0, tamano, tamano);
        canvas.toBlob((blob, type) => {
            var form = new FormData();
            form.append('file', blob);
            this.props.store.galery.establecerFotoPerfil(form)
                .then(() => {
                    const random = parseInt(Math.random() * 9000 + 1000, 10);
                    this.props.store.setState({
                        content: "Salvado correctamente.",
                        fotoPerfil: random
                    });
                });
        });
    }
    getTamano() {
        return this.tamano || 300;
    };
    drawComponent() {
        const url = this.props.url;
        const tamano = this.getTamano();
        const editar = this.props.editar;
        var img = new Image();
        img.crossOrigin = "use-credentials";
        img.onload = () => {
            var iheight = img.height;
            var iwidth  = img.width;
            var cwidth  = this.canvas.clientWidth || this.canvas.innerWidth;
            this.canvas.height = iheight;
            this.canvas.width = iwidth;
            this.canvasO.height = iheight;
            this.canvasO.width = iwidth;
            this.canvas.style.height = (iheight / iwidth * cwidth) + "px";
            this.canvasO.style.height = (iheight / iwidth * cwidth) + "px";
            this.canvasO.style.width = cwidth + "px";

            var cheight  = this.canvas.clientHeight || this.canvas.innerHeight;
            this.ctx.drawImage(img, 0, 0, iwidth, iheight);

            if (editar === true) {
                this.left = this.left || (cwidth - tamano) / 2;
                this.top = this.top || (cheight - tamano - 100) / 2;
                if (typeof this.tamano === "undefined")
                    this.setearTamano(this.props.tamano || 300);
                this.fillSelection();
            }
        };
        img.src = url;
        this.image = img;
    }
}