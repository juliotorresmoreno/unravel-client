import React from 'react';

import MessagesCtrl from './main.ctrl';


export default class Messages extends MessagesCtrl {
    constructor(args) {
        super(args);
    }
    render = function() {
        return (
            <div>
               Messages 
            </div>
        )
    }
}