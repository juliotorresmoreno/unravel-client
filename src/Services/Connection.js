import ServiceBase from '../Lib/ServiceBase';

var _store, ws;

export default class Connection extends ServiceBase {
    constructor(store) {
        super(store);
        _store = store;
        store.connection = this;
    }
    open = (token) => {
        if(typeof ws !== 'undefined' || !token)
            return;
        if(typeof ws === 'undefined' && token) {
            var url = _store.getState().config.servidorwss + '?token=' + token;
            ws = new WebSocket(url);
            ws.onopen = () => _store.setState({wss: {type: 'open'}});
            ws.onmessage = (request) => _store.setState({wss: {type: 'message', data: JSON.parse(request.data)}});
            ws.onerror = (e) => _store.setState({wss: {type: 'error', error: e}});
            ws.onclose = (e) => _store.setState({wss: {type: 'close', event: e}});
        }
    };
}