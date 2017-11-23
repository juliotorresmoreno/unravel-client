import { PureComponent } from 'react';

export default class PeticionVideoLlamadaCtrl extends PureComponent {
    onHandlerAceptar = (e, obj) => {
        e.preventDefault();
        var store = this.props.store;
        store.chat.callVideoLlamada(this.props.user.usuario);
    }
    onHandlerRechazar = (e, obj) => {
        e.preventDefault();
        var store = this.props.store;
        store.chat.rechazarvideollamada(this.props.user.usuario);
    }
}