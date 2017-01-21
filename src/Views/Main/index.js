import React, { Component } from 'react';

import Login from '../Login';
import MenuTop from '../MenuTop';
import MenuLeft from '../MenuLeft';
import MenuRight from '../MenuRight';

export default class Main extends Component {
    render = () => {
        const
            autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized,
            {params, store, route, router,children} = this.props;
        if (autorized && this.props.route.store.getState().session)
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
        if (autorized && !this.isLoading)
            return <Login params={params} route={route} router={router} store={store}/>;
        return children;
    }
}