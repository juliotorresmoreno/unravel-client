import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import RecuperarCtrl from './index.ctrl';

export default class Recuperar extends RecuperarCtrl {
    state = {};
    errors = {};
    form = { passwd: '', passwdConfirm: '', id: '' };
    componentWillUpdate() {
        const id = this.props.location.query.id;
        this.form.id = id;
    }
    render = () => {
        const title = this.props.store.lang.get('login_recuperar');
        const password = this.props.store.lang.get('login_password');
        const cpassword = this.props.store.lang.get('login_confirm_password');
        const confirm = this.props.store.lang.get('login_recuperar');
        const displayE = this.state.error ? '': 'none';
        return (
            <Container text>
                <br/>
                <div style={{maxWidth:350,width:'100%',marginLeft:'50%',transform:'translateX(-50%)'}}>
                    <h2 style={{color:'red',display:displayE}}>{this.state.error}</h2>
                    <Form onSubmit={this.handlerCambiarContrasena} method="post">
                        <h2 style={{textAlign:'center'}}>{title}</h2>
                        <br/>
                        <Form.Field>
                            <label>{password}</label>
                            <Form.Input
                                name='passwd'
                                onChange={this.onHandlerChange}
                                value={this.form.passwd}
                                placeholder={password}
                                type='password' />
                            <div style={{color:'red'}}>{this.errors.passwd}</div>
                        </Form.Field>
                        <Form.Field>
                            <label>{cpassword}</label>
                            <Form.Input
                                name='passwdConfirm'
                                onChange={this.onHandlerChange}
                                value={this.form.passwdConfirm}
                                placeholder={cpassword}
                                type='password' />
                        </Form.Field>
                        <Button primary>{confirm}</Button>
                    </Form>
                </div>
            </Container>
        );
    }
}