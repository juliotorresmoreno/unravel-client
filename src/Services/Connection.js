import ServiceBase from '../Lib/ServiceBase';
var _store, socket, esperar = false;

export default class Connection extends ServiceBase {
    constructor(store) {
        super(store);
        _store = store;
        store.connection = this;
    }
    open = (token) => {
        esperar = false;
        if(typeof socket !== 'undefined' || !token)
            return;
        if(typeof socket === 'undefined' && token) {
            var url = _store.getState().config.servidorwss + '?token=' + token;
            socket = new WebSocket(url);
            socket.onopen = () => _store.setState({wss: {type: 'open'}});
            socket.onmessage = (request) => {
                _store.setState({wss: {type: 'message', data: JSON.parse(request.data)}});
            };
            socket.onerror = (e) => {
                _store.setState({wss: {type: 'error', error: e}});
                esperar = true;
                e.preventDefault();
                e.stopPropagation();
            };
            socket.onclose = (e) => {
                _store.setState({wss: {type: 'close', event: e}});
                socket = undefined;
                if(esperar)
                    setTimeout(() => this.open(token), 3000);
                else
                    this.open(token);
                e.preventDefault();
                e.stopPropagation();
            };
        }
    };
}