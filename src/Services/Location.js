import ServiceBase from '../Lib/ServiceBase';

export default class Location extends ServiceBase
{
    constructor(store)
    {
        super();
        this.getSession = (user) => {
            var usuario = store.getState().usuario;
            var session = store.getState().session;
            if (user && usuario && usuario.usuario !== session.usuario) {
                return usuario;
            }
            return session;
        };
        this.store = store;
        store.location = this;
    }
}