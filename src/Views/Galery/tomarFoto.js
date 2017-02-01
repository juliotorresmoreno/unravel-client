import React from 'react';

import { Button, Image } from 'semantic-ui-react';
import Webcam from 'react-webcam';

import tomarFotoCtrl from './tomarFoto.ctrl';


export default class tomarFoto extends tomarFotoCtrl {
    componentDidMount() {
    }
    render = () => {
        if (this.captura) {
            return (
                <div>
                    <Button primary onClick={this.handlerSubir}>Subir</Button>
                    <Button primary onClick={this.handlerCancelar}>Cancelar</Button>
                    <br />
                    <br />
                    <div><Image src={this.captura} /></div>
                </div>
            )            
        }
        return (
            <div>
                <Button primary onClick={this.handlerTomarFoto}>Tomar</Button>
                <Button primary onClick={this.handlerCancelar}>Cancelar</Button>
                <br />
                <br />
                <div><Webcam ref="webcam" audio={false} /></div>
            </div>
        )
    }
}