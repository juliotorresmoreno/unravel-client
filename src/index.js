
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import React, { Component } from 'react'
import './index.css';
import App from './Views/App';
import Login from './Views/Login/main';
import Register from './Views/Register/main';


import Lang from './Lang/main';
import Auth from './Services/Auth';
import Alert from './Services/Alert';
import Store from './Store/Store';
import config from './config/config';

var store = new Store({config:config});
store.addService(Lang);
store.addService(Auth);
store.addService(Alert);

class NoMatch extends Component {
    render() {
        return (
            <span>Not found</span>
        );
    }
}

var noauth = (
    <Route path="/" component={App} store={store}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Register}/>
        <Route path="*" component={NoMatch}/>
    </Route>
);
var auth = (
    <Route path="/" component={App} store={store}>
        <Route path="*" component={NoMatch}/>
    </Route>
);

class Index extends Component {
    constructor(args) {
        super(args);
        store.subscribe(this, ['session'], "Index");
    }
    render() {
        return (
            <Router history={browserHistory}>
                {store.getState().session ? auth: noauth}
            </Router>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));