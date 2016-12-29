
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import React, { Component } from 'react'
import './index.css';
import App from './Views/App';
import E404 from './Views/E404/main';
import Lang from './Lang/main';
import Auth from './Services/Auth';
import Alert from './Services/Alert';
import Store from './Store/Store';
import config from './config/config';

import Profile from './Views/Profile/main';
import News from './Views/News/main';
import Messages from './Views/Messages/main';
import Friends from './Views/Friends/main';
import Galery from './Views/Galery/main';

var store = new Store({config:config});
store.addService(Lang);
store.addService(Auth);
store.addService(Alert);


class Index extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App} store={store}>
                    <Route path="news" component={News} />
                    <Route path="profile" component={Profile} />
                    <Route path="messages" component={Messages} />
                    <Route path="friends" component={Friends} />
                    <Route path="galery" component={Galery} />

                    <Route path=":user/profile" component={Profile} />
                    <Route path=":user/messages" component={Messages} />
                    <Route path=":user/friends" component={Friends} />
                    <Route path=":user/galery" component={Galery} />
                    <Route path=":user/news" component={News} />
                    <Route path="*" component={E404} />
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));