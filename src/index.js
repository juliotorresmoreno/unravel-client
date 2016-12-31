
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import React, { Component } from 'react'
import './index.css';
import App from './Views/App';
import E404 from './Views/E404/main';
import Store from './Store/Store';
import config from './config/config';

import SLang from './Lang/main';
import SAuth from './Services/Auth';
import SAlert from './Services/Alert';
import SProfile from './Services/Profile';

import Register from './Views/Register/main';
import Profile from './Views/Profile/main';
import News from './Views/News/main';
import Messages from './Views/Messages/main';
import Friends from './Views/Friends/main';
import Galery from './Views/Galery/main';

var store = new Store({config:config});
store.addService(SLang);
store.addService(SAuth);
store.addService(SAlert);
store.addService(SProfile);


class Index extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App} store={store}>
                    <Route path="signup" component={Register} />
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