import React, { Component } from 'react';;
import { Button, Dropdown } from 'semantic-ui-react'

export default class Permisos extends Component {
    state = {isLoading: false};
    onHandlerClick = (e, obj) => {
        this.permiso = obj.name || this.props.permiso || 'public';
        if (typeof this.props.onClick === 'function')
        {
            this.props.onClick(e, this, this.permiso);
        }
        this.forceUpdate();
    }
    render = () => {
        if(this.state.isLoading) {
            return (
                <Button.Group>
                    <Button disabled loading>{this.props.label}</Button>
                    <Dropdown disabled floating button className='icon'/>
                </Button.Group>
            );
        }
        var permiso = this.permiso || this.props.permiso || 'public';
        return (
            <Button.Group>
                <Button primary onClick={this.onHandlerClick}>{this.props.label}</Button>
                <Dropdown floating button className='icon'>
                <Dropdown.Menu>
                    <Dropdown.Item
                        active={permiso==="public"}
                        name="public" text='Publico'
                        onClick={this.onHandlerClick} />
                    <Dropdown.Item
                        active={permiso==="friends"}
                        name='friends' text='Amigos'
                        onClick={this.onHandlerClick} />
                    <Dropdown.Item
                        active={permiso==="private"}
                        name='private' text='Solo yo'
                        onClick={this.onHandlerClick} />
                </Dropdown.Menu>
                </Dropdown>
            </Button.Group>
        );
    }
}