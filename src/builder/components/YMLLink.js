import React, { Component } from 'react';
import { shell } from 'electron';
import { Button, FormGroup } from 'reactstrap';

export class YMLLinkView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (<FormGroup key={keyPath}>
            <Button
                className={`text-${obj.color}`}
                onClick={()=>{
                    obj.link && shell.openExternal(obj.link)
                }}
                color="link"
            >
                {obj.icon && <i className={obj.icon} />}
                {obj.label}
            </Button></FormGroup>
        );
    }
}
