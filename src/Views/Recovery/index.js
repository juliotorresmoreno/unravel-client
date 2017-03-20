import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import RecoveryCtrl from './index.ctrl';

export default class Recovery extends RecoveryCtrl {
    state = { send: false };
    form = { email: '' };
    render = () => {
        const title = this.props.store.lang.get('login_recovery');
        const email = this.props.store.lang.get('login_email');
        const send_mail = this.props.store.lang.get('login_send_mail');
        const displayE = this.state.error ? '': 'none';
        if (this.state.send) {
            return (
                <div>
                    Se ha enviado un correo electronico a {this.form.email}.
                </div>
            );
        }
        return (
            <Container text>
                <br/>
                <div style={{maxWidth:350,width:'100%',marginLeft:'50%',transform:'translateX(-50%)'}}>
                    <h2 style={{color:'red',display:displayE}}>{this.state.error}</h2>
                    <Form onSubmit={this.handlerEnviarEmail} method="post">
                        <h2 style={{textAlign:'center'}}>{title}</h2>
                        <br/>
                        <Form.Field>
                            <label>{email}</label>
                            <Form.Input name='email'
                                onChange={this.onHandlerChange}
                                value={this.form.email}
                                placeholder={email} />
                        </Form.Field>
                        <Button primary>{send_mail}</Button>
                    </Form>
                </div>
            </Container>
        );
    }
}