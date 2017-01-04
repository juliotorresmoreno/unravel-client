import React, { Component } from 'react';;
import { Button, Dropdown } from 'semantic-ui-react'

export default class Permisos extends Component {
    permiso = 'public';
    state = {isLoading: false};
    onHandlerClick = (e, obj) => {
        if (typeof obj.name !== 'undefined')
        {
            this.permiso = obj.name;
        }
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
                    <Button disabled>{this.props.label}</Button>
                    <Dropdown disabled floating button className='icon'/>
                </Button.Group>
            );
        }
        return (
            <Button.Group>
                <Button primary onClick={this.onHandlerClick}>{this.props.label}</Button>
                <Dropdown floating button className='icon'>
                <Dropdown.Menu>
                    <Dropdown.Item
                        active={this.permiso==="public"}
                        name="public" text='Publico'
                        onClick={this.onHandlerClick} />
                    <Dropdown.Item
                        active={this.permiso==="friends"}
                        name='friends' text='Amigos'
                        onClick={this.onHandlerClick} />
                    <Dropdown.Item
                        active={this.permiso==="private"}
                        name='private' text='Solo yo'
                        onClick={this.onHandlerClick} />
                </Dropdown.Menu>
                </Dropdown>
            </Button.Group>
        );
    }
}