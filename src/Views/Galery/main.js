import React from 'react';

import GaleryCtrl from './main.ctrl';


export default class Galery extends GaleryCtrl {
    constructor(args) {
        super(args);
    }
    render = function() {
        return (
            <div>
               Galery 
            </div>
        )
    }
}