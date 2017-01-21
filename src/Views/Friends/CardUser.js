import React from 'react';

import { Image, Feed } from 'semantic-ui-react'
import CardUserCtrl from './index.ctrl';
const moment = window.moment;

export default class CardUser extends CardUserCtrl {
    render = () => {
        const user = this.props.user;
        const redirect = (e) => {
            e.preventDefault();
            this.props.router.push("/" + user.usuario + "/profile");
        }
        return (
            <Feed>
                <Feed.Event>
                    <Feed.Label style={{width: "auto"}}>
                        <Image style={{height:60, width: "auto"}} src='/static/svg/user-3.svg' />
                    </Feed.Label>
                    <Feed.Content style={{margin: "0 10px 5px"}}>
                        <Feed.Summary>
                            <Feed.User as="a" onClick={redirect} href={"/" + user.usuario + "/profile"}>
                                {user.nombres + " " + user.apellidos}
                            </Feed.User>
                            <Feed.Date>Registrado en {moment(user.registrado).format("MMM Do YYYY")}</Feed.Date>
                        </Feed.Summary>
                        <Feed.Meta>
                            <Feed.Like>
                                {user.estado}
                            </Feed.Like>
                        </Feed.Meta>
                    </Feed.Content>
                </Feed.Event>
            </Feed>
        );
    }
}