
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import React, { Component } from 'react';
import '../node_modules/semantic-ui-css/semantic.css';
import './index.css';
import App from './Views/App';
import E404 from './Views/E404';
import Store from './Store/Store';
import config from './config/config';

import SLang from './Lang/main';
import SAuth from './Services/Auth';
import SAlert from './Services/Alert';
import SProfile from './Services/Profile';
import SFriends from './Services/Friends';
import SGalery from './Services/Galery';
import SLocation from './Services/Location';
import SCategory from './Services/Category';
import SGroups from './Services/Groups';
import SNews from './Services/News';
import SChat from './Services/Chat';
import SConnection from './Services/Connection';

import Register from './Views/Register';
import Recovery from './Views/Recovery';
import Recuperar from './Views/Recuperar';
import Profile from './Views/Profile';
import News from './Views/News';
import Messages from './Views/Messages';
import Friends from './Views/Friends';
import Galery from './Views/Galery';
import Groups from './Views/Groups';
import Chat from './Views/Chat';
import moment from 'moment';

var store = new Store({config:config});
store.addService(SLang);
store.addService(SAuth);
store.addService(SAlert);
store.addService(SProfile);
store.addService(SFriends);
store.addService(SGalery);
store.addService(SLocation);
store.addService(SCategory);
store.addService(SGroups);
store.addService(SChat);
store.addService(SNews);
store.addService(SConnection);
moment.locale('es');

class Index extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" autorized={true} component={App} store={store}>
                    <Route autorized={false} path="signup" component={Register} />
                    <Route autorized={false} path="recovery_password" component={Recovery} />
                    <Route autorized={false} path="recuperar" component={Recuperar} />
                    <Route autorized={true} path="news" component={News} />
                    <Route autorized={true} path="profile" component={Profile} />
                    <Route autorized={true} path="messages" component={Messages} />
                    <Route autorized={true} path="friends" component={Friends} />
                    <Route autorized={true} path="galery" component={Galery} />
                    <Route autorized={true} path="galery/create" component={Galery} />
                    <Route autorized={true} path="galery/:galery" component={Galery} />
                    <Route autorized={true} path="galery/:galery/editar" component={Galery} />
                    <Route autorized={true} path="galery/:galery/tomarFoto" component={Galery} />
                    <Route autorized={true} path="galery/:galery/:image" component={Galery} />
                    <Route autorized={true} path="groups" component={Groups} />
                    <Route autorized={true} path="groups/create" component={Groups} />
                    <Route autorized={true} path="groups/:group" component={Groups} />
                    
                    <Route autorized={true} path=":user/chat" component={Chat} />
                    <Route autorized={true} path=":user/profile" component={Profile} />
                    <Route autorized={true} path=":user/messages" component={Messages} />
                    <Route autorized={true} path=":user/friends" component={Friends} />
                    <Route autorized={true} path=":user/galery" component={Galery} />
                    <Route autorized={true} path=":user/galery/:galery" component={Galery} />
                    <Route autorized={true} path=":user/galery/:galery/:image" component={Galery} />
                    <Route autorized={true} path=":user/galery/create" component={Galery} />
                    <Route autorized={true} path=":user/news" component={News} />
                    <Route autorized={true} path=":user/groups" component={Groups} />
                    <Route path="*" component={E404} />
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));