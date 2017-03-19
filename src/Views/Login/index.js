import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router';
import LoginCtrl from './index.ctrl';

export default class Login extends LoginCtrl {
    form = {
        usuario: '',
        passwd: '' 
    }
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
    }
    render = function() {
        const title = this.props.store.lang.get('login_title_login');
        const email = this.props.store.lang.get('login_email');
        const password = this.props.store.lang.get('login_password');
        const recovery = this.props.store.lang.get('login_recovery');
        const login = this.props.store.lang.get('login_login');
        const displayE = this.state.error ? '': 'none';
        return (
            <Container text>
                <br/>
                <div style={{maxWidth:350,width:'100%',marginLeft:'50%',transform:'translateX(-50%)'}}>
                    <h2 style={{color:'red',display:displayE}}>{this.state.error}</h2>
                    <Form onSubmit={this.onLogin} method="post">
                        <h2 style={{textAlign:'center'}}>{title}</h2>
                        <br/>
                        <Form.Field>
                            <label>{email}</label>
                            <Form.Input 
                                name='usuario'
                                onChange={this.onHandlerChange}
                                value={this.form.usuario}
                                placeholder={email} />
                        </Form.Field>
                        <Form.Field>
                            <label>{password}</label>
                            <Form.Input
                                name='passwd' 
                                onChange={this.onHandlerChange}
                                value={this.form.passwd}
                                placeholder={password}
                                type='password' />
                        </Form.Field>
                        <Button primary>{login}</Button>
                        <Link to="/recovery_password">{recovery}</Link>
                    </Form>
                    <br />
                    <br />
                    <div>
                        <Button onClick={this.authFacebook} color='facebook'>Facebook</Button>
                        <Button onClick={this.authGoogle} color='google plus'>Google Plus</Button>
                        <Button onClick={this.authGithub} color='green'>Github</Button>
                    </div>
                </div>
            </Container>
        );
    }
}