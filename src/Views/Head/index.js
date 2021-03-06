import React from 'react';

import Logged from './logged';
import NoLogged from './nologged';
import HeadCtrl from './index.ctrl';

export default class Head extends HeadCtrl{
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
    }
    render = function() {
        if (this.props.store.getState().session)
        {
            return <Logged router={this.props.router} store={this.props.store}/>;
        }
        else
        {
            return <NoLogged router={this.props.router} store={this.props.store}/>;
        }
    }
}