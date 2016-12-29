import React from 'react';

import ProfileCtrl from './main.ctrl';


export default class Profile extends ProfileCtrl {
    constructor(args) {
        super(args);
    }
    render = function() {
        return (
            <div>
               Profile 
            </div>
        )
    }
}