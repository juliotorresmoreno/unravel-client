class listaElementos {
    constructor(elementos) {
        var _elementos = {};
        this.elementosUpdate = (index) => {
            for(let j in elementos)
                if(elementos.hasOwnProperty(j)) {
                    let el = elementos[j];
                    if ((el.filter.indexOf(index) + 1 || index === "updateAt") && el.item.mounted)
                        _elementos[j] = el;
                }
        }
        this.getList = () => {
            let r = [];
            for(let i in _elementos)
                if(_elementos.hasOwnProperty(i))
                    r.push(_elementos[i]);
            return r; 
        };
    }
}

var elementos = Symbol("elementos");
var state = Symbol("state");

export default class Store {
    constructor(args) {
        this[state] = args || {};
        this[elementos] = {};
    }
    setState = (data, update) => {
        var _listaElementos = new listaElementos(this[elementos]);
        for(let i in data)
            if (data.hasOwnProperty(i))
                this[state][i] !== data[i]
                    && (this[state][i] = data[i] || true)
                    && update !== false
                        && _listaElementos.elementosUpdate(i);
        const _elementos = _listaElementos.getList();
        for(let i = 0; i < _elementos.length; i++) {
            let item = _elementos[i].item;
            if(item.Midlewares && Array.isArray(item.Midlewares))
                for(let j = 0; j < item.Midlewares.length; j++)
                    if(typeof item.Midlewares[j] === "function")
                        item.Midlewares[j](this, data);
        };
        for(let i = 0; i < _elementos.length; i++)
            _elementos[i].item.setState({updateAt:new Date()});
    }
    getState = (data) => {
        return this[state];
    }
    subscribe = (elemento, filter, key, root) => {
        var subscribe = {item: elemento, filter: filter};
        if(typeof elemento === 'undefined') {
            return;
        }
        if (root !== true) {
            if(typeof elemento.componentDidMount === 'function') {
                let componentDidMount = elemento.componentDidMount; 
                elemento.componentDidMount = function() { 
                    this.mounted = true;
                    componentDidMount();
                }.bind(elemento);
            } else {
                elemento.componentDidMount = function() { 
                    this.mounted = true;
                }.bind(elemento);
            }
            if(typeof elemento.componentWillUnmount === 'function') {
                let componentWillUnmount = elemento.componentWillUnmount; 
                elemento.componentWillUnmount = function() { 
                    this.mounted = false;
                    this.unsubscribe();
                    componentWillUnmount();
                }.bind(elemento);
            } else {
                elemento.componentWillUnmount = function() { 
                    this.mounted = false;
                    this.unsubscribe();
                }.bind(elemento);
            }
        }
        elemento.unsubscribe = () => {
            delete this[elementos][key];
        };
        this[elementos][key] = subscribe;
    }
    addService = function (service) {
        return new service(this);
    }
}