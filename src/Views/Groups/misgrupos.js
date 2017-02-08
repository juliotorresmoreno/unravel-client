import React from 'react';

import MisGruposCtrl from './misgrupos.ctrl';
import { Button } from 'semantic-ui-react';

export default class MisGrupos extends MisGruposCtrl {
    render = () => {
        const {store} = this.props;
        const crear_grupos = store.lang.get("grupos_crear_grupos");
        return (
            <div style={{minHeight: '100%'}}>
                <Button primary>{crear_grupos}</Button>
            </div>
        )
    }
}