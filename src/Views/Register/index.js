import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

import RegisterCtrl from './index.ctrl';

export default class Register extends RegisterCtrl{
    form = { nombres: '', apellidos: '', email: '', usuario: '', passwd: '', passwdConfirm: '' };
    render = () => {
        const store = this.props.store;
        const title = store.lang.get('login_title_register');
        const name = store.lang.get('login_name');
        const lastname = store.lang.get('login_lastname');
        const email = store.lang.get('login_email');
        const username = store.lang.get('login_username');
        const password = store.lang.get('login_password');
        const confirm = store.lang.get('login_confirm_password');
        return (
            <Container text>
                <br/>
                <div style={{maxWidth:350,width:'100%',marginLeft:'50%',transform:'translateX(-50%)'}}>
                    <Form onSubmit={this.onRegister} method="post">
                        <h2 style={{textAlign:'center'}}>{title}</h2>
                        <br/>
                        <Form.Field>
                            <label>{name}</label>
                            <Form.Input 
                                name='nombres' 
                                onChange={this.onHandlerChange}
                                value={this.form.nombres}
                                placeholder={name} />
                            <div>{this.errors.nombres}</div>
                        </Form.Field>
                        <Form.Field>
                            <label>{lastname}</label>
                            <Form.Input
                                name='apellidos'
                                onChange={this.onHandlerChange}
                                value={this.form.apellidos}
                                placeholder={lastname} />
                            <div style={{color:'red'}}>{this.errors.apellidos}</div>
                        </Form.Field>
                        <Form.Field>
                            <label>{email}</label>
                            <Form.Input
                                name='email'
                                onChange={this.onHandlerChange}
                                value={this.form.email}
                                placeholder={email} />
                            <div style={{color:'red'}}>{this.errors.email}</div>
                        </Form.Field>
                        <Form.Field>
                            <label>{username}</label>
                            <Form.Input
                                name='usuario'
                                onChange={this.onHandlerChange}
                                value={this.form.usuario}
                                placeholder={username} />
                            <div style={{color:'red'}}>{this.errors.username}</div>
                        </Form.Field>
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
                            <label>{confirm}</label>
                            <Form.Input
                                name='passwdConfirm'
                                onChange={this.onHandlerChange}
                                value={this.form.passwdConfirm}
                                placeholder={confirm}
                                type='password' />
                        </Form.Field>
                        <Button primary>Registrar</Button>
                    </Form>
                </div>
                <br />
            </Container>
        );
    }
}