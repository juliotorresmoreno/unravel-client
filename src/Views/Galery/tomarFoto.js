import React from 'react';

import { Button } from 'semantic-ui-react';

import tomarFotoCtrl from './tomarFoto.ctrl';

export default class tomarFoto extends tomarFotoCtrl {
    render = () => {
        return (
            <div>
                <Button onClick={this.handlerTomarFoto}>Tomar</Button>
                <video ref={(el) => this.video = el} />
            </div>
        )
    }
}