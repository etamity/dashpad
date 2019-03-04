import React, { Component } from 'react';
import { shell } from 'electron';
import { Button } from 'reactstrap';

export class YMLLinkView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <Button
                key={keyPath}
                className={`text-${obj.color}`}
                onClick={()=>{
                    obj.link && shell.openExternal(obj.link)
                }}
                color="link"
            >
                {obj.icon && <i className={obj.icon} />}
                {obj.label}
            </Button>
        );
    }
}
