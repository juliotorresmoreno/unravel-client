
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
import SFriends from './Services/Friends';

import Register from './Views/Register/main';
import Profile from './Views/Profile/main';
import News from './Views/News/main';
import Messages from './Views/Messages/main';
import Friends from './Views/Friends/main';
import Galery from './Views/Galery/main';
import Groups from './Views/Groups/main';

var store = new Store({config:config});
store.addService(SLang);
store.addService(SAuth);
store.addService(SAlert);
store.addService(SProfile);
store.addService(SFriends);


class Index extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" autorized={true} component={App} store={store}>
                    <Route autorized={false} path="signup" component={Register} />
                    <Route autorized={true} path="news" component={News} />
                    <Route autorized={true} path="profile" component={Profile} />
                    <Route autorized={true} path="messages" component={Messages} />
                    <Route autorized={true} path="friends" component={Friends} />
                    <Route autorized={true} path="galery" component={Galery} />
                    <Route autorized={true} path="groups" component={Groups} />

                    <Route autorized={true} path=":user/profile" component={Profile} />
                    <Route autorized={true} path=":user/messages" component={Messages} />
                    <Route autorized={true} path=":user/friends" component={Friends} />
                    <Route autorized={true} path=":user/galery" component={Galery} />
                    <Route autorized={true} path=":user/news" component={News} />
                    <Route path="*" component={E404} />
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));