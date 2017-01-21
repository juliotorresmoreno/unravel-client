class listaElementos {
    constructor(elementos) {
        var _elementos = {};
        this.elementosUpdate = (index) => {
            for(let j in elementos)
            {
                if(elementos.hasOwnProperty(j))
                {
                    if(elementos[j].filter.indexOf(index) + 1 || index === "updateAt")
                    {
                        _elementos[j] = elementos[j];
                    }
                }
            }
        }
        this.getList = () => _elementos;
    }
}

export default class Store {
    constructor(args) {
        var elementos = {};
        var state = args || {};
        this.setState = (data, update) => {
            var _listaElementos = new listaElementos(elementos);
            state = Object.assign({}, state);
            for(let i in data)
            {
                if(data.hasOwnProperty(i) && state[i] !== data[i])
                {
                    state[i] = data[i];
                    if(update !== false)
                    {
                        _listaElementos.elementosUpdate(i);
                    }
                }
            }
            var list = _listaElementos.getList();
            for(let i in list)
            {
                if(list.hasOwnProperty(i) && list[i].item.mounted)
                {
                    if(list[i].item.Midlewares && Array.isArray(list[i].item.Midlewares))
                    {
                        for(var j = 0; j < list[i].item.Midlewares.length; j++)
                        {
                            if(typeof list[i].item.Midlewares[j] === "function")
                            {
                                list[i].item.Midlewares[j](this, data);
                            }
                        }
                    }
                }
            }
            for(let i in list)
            {
                if(list.hasOwnProperty(i) && list[i].item.mounted)
                {
                    list[i].item.setState({updateAt:new Date()});
                }
            }
        }
        this.getState = (data) => {
            return state;
        }
        this.subscribe = (elemento, filter, key, root) => {
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
            elemento.unsubscribe = function() {
                delete elementos[key];
            };
            elementos[key] = subscribe;
        }
        this.addService = function (service) {
            return new service(this);
        }
    }
}