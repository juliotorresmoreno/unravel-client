import React from 'react';

import FriendsCtrl from './main.ctrl';


export default class Friends extends FriendsCtrl {
    constructor(args) {
        super(args);
    }
    render = function() {
        return (
            <div>
               Friends 
            </div>
        )
    }
}