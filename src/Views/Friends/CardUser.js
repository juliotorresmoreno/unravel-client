import React from 'react';

import { Card, Image } from 'semantic-ui-react'
import CardUserCtrl from './main.ctrl';
const moment = window.moment;

export default class CardUser extends CardUserCtrl {
    go = (e, obj) => {
        e.preventDefault()
        this.props.router.push(obj.href);
    }
    render = function() {
        return (
            <Card as="a" onClick={this.go} href={"/" + this.props.user.usuario + "/profile"}>
                <Image src='/static/svg/user-3.svg' />
                <Card.Content>
                    <Card.Header>
                        {this.props.user.nombres + " " + this.props.user.apellidos}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            Registrado en {moment(this.props.user.registrado).format("MMM Do YYYY")}
                        </span>
                    </Card.Meta>
                </Card.Content>
            </Card>
        );
    }
}