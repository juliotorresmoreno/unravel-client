import React from 'react';

import NewsCtrl from './main.ctrl';


export default class News extends NewsCtrl {
    constructor(args) {
        super(args);
    }
    render = function() {
        return (
            <div>
               News 
            </div>
        )
    }
}