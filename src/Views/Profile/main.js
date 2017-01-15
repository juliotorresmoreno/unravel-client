import React from 'react';

import { Dimmer, Loader, Menu, Segment } from 'semantic-ui-react'

import ProfileCtrl from './main.ctrl';
import Basic from './basic';
import Contact from './contact';
import Interests from './interests';

const Views = {
    Basico: (p) => <Basic params={p.params} route={p.route} router={p.router} store={p.store} />,
    Contacto: (p) => <Contact params={p.params} route={p.route} router={p.router} store={p.store} />,
    Intereses: (p) => <Interests params={p.params} route={p.route} router={p.router} store={p.store} />
}

export default class Profile extends ProfileCtrl {
    state = { activeItem: 'Basico', isLoading: true }
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['profile'], "Profile");
        this.props.store.profile.load(this.props.params.user)
            .then(() => this.setState({isLoading: false}));
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    render() {
        const { activeItem } = this.state;
        const activeView = Views[activeItem](this.props);
        if (!this.state.isLoading)
        {
            return (
                <div>
                    <Menu pointing secondary>
                        <Menu.Item name='Basico' active={activeItem === 'Basico'} onClick={this.handleItemClick} />
                        <Menu.Item name='Contacto' active={activeItem === 'Contacto'} onClick={this.handleItemClick} />
                        <Menu.Item name='Intereses' active={activeItem === 'Intereses'} onClick={this.handleItemClick} />
                    </Menu>
                    <Segment>
                        {activeView}
                    </Segment>
                </div>
            );
        }
        return (
            <Segment style={{height: '200px', border: 0}}>
                <Dimmer active inverted style={{border: 0}}>
                    <Loader inverted content='Loading' />
                </Dimmer>
            </Segment>
        );
    }
}