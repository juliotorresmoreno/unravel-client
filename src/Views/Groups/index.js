import React from 'react';

import {Menu, Segment} from 'semantic-ui-react';

import GroupsCtrl from './index.ctrl';
import Formulario from './formulario';
import MisGrupos from './misgrupos';
import TodosGrupos from './todosgrupos';

export default class Groups extends GroupsCtrl {
    state = { activeItem: 'home' };
    handleItemClick = (e, { name }) => {
        this.props.router.push('/groups');
        this.setState({ activeItem: name });
    };
    
    componentWillMount() {
        this.props.store.subscribe(this, ['groups', 'group', 'categorys'], "Groups");
    };
    getContent() {
        const { store, router, routes, params } = this.props;
        const { activeItem } = this.state;
        if ("groups/create" === routes[1].path)
            return <Formulario store={store} router={router} params={params} routes={routes} />;
        if ("groups/:group" === routes[1].path)
            return <Formulario store={store} router={router} params={params} routes={routes} />;
        if (activeItem === 'home')
            return <MisGrupos store={store} router={router} />;
        if (activeItem === 'todos')
            return <TodosGrupos store={store} router={router} />;
    }
    render = function() {
        const { store } = this.props;
        const { activeItem } = this.state;
        const mis_grupos = store.lang.get("grupos_mis_grupos");
        const todos_grupos = store.lang.get("grupos_todos_grupos");
        const content = this.getContent();
        return (
            <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
                <Menu pointing secondary>
                    <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                        {mis_grupos}
                    </Menu.Item>
                    <Menu.Item name='todos' active={activeItem === 'todos'} onClick={this.handleItemClick}>
                        {todos_grupos}
                    </Menu.Item>
                </Menu>
                <Segment style={{flex: 1, margin: '0 0 10px 0'}}>
                    {content}
                </Segment>
            </div>
        )
    }
}