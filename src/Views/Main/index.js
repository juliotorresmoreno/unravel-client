import React, { Component } from 'react';

import MenuTop from '../MenuTop';
import MenuLeft from '../MenuLeft';
import MenuRight from '../MenuRight';

export default class Main extends Component {
    render = () => {
        const {params, store, route, router, children} = this.props;
        if (store.getState().session)
            return (
                <div style={{display:'flex',flexDirection:'vertical',height:'100%'}}>
                    <MenuLeft params={params} route={route} router={router} store={store} />
                    <div style={{padding:'15px 0',flex:1}}>
                        <div style={{height: '100%'}}>
                            <MenuTop params={params} route={route} router={router} store={store} />
                            {children}
                        </div>
                    </div>
                    <MenuRight params={params} route={route} router={router} store={store} />
                </div>
            );
        return children;
    }
}