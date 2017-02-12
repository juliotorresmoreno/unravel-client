import React from 'react';

import MisGruposCtrl from './misgrupos.ctrl';
import { Button, Item } from 'semantic-ui-react';
import moment from 'moment'

export default class MisGrupos extends MisGruposCtrl {
    constructor(args) {
        super(args);
        this.props.store.subscribe(this, ['groups'], "MisGrupos");
    }
    componentDidMount = () => {
        const {store} = this.props;
        store.groups.consultar();
    }
    render = () => {
        const {store} = this.props;
        const groups = store.getState().groups || [];
        const crear_grupos = store.lang.get("grupos_crear_grupos");
        return (
            <div style={{minHeight: '100%'}}>
                <div>
                    <Button primary onClick={this.handlerCreate}>{crear_grupos}</Button>
                </div>
                <br />
                <div>
                    <Item.Group>
                        {groups.map((value, index) => {
                            var src = store.getState().config.api + "/groups/" + value.nombre + "/preview";
                            return (
                                <Item key={index}>
                                    <Item.Image size='tiny' src={src} />
                                    <Item.Content>
                                        <Item.Header as='a' onClick={this.handlerGo} href={'/groups/' + value.nombre}>
                                            {value.nombre}
                                        </Item.Header>
                                        <Item.Description>
                                            {value.descripcion}
                                        </Item.Description>
                                        <Item.Extra>Creado {moment(value.create_at).format("MMM Do YYYY h:mm:ss a")}</Item.Extra>
                                    </Item.Content>
                                </Item>
                            );
                        })}
                    </Item.Group>
                </div>
            </div>
        )
    }
}
//{JSON.stringify(store.getState().groups)}