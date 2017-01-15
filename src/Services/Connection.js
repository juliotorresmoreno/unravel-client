import ServiceBase from '../Lib/ServiceBase';
var _store, socket;

export default class Connection extends ServiceBase {
    constructor(store) {
        super(store);
        _store = store;
        store.connection = this;
    }
    open = (token) => {
        if(typeof socket !== 'undefined' || !token)
            return;
        if(typeof socket === 'undefined' && token) {
            var url = _store.getState().config.servidorwss + '?token=' + token;
            socket = new WebSocket(url);
            socket.onopen = () => _store.setState({wss: {type: 'open'}});
            socket.onmessage = (request) => {
                _store.setState({wss: {type: 'message', data: JSON.parse(request.data)}});
            };
            socket.onerror = (e) => _store.setState({wss: {type: 'error', error: e}});
            socket.onclose = (e) => _store.setState({wss: {type: 'close', event: e}});
        }
    };
}