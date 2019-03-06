import React, { Component } from 'react';
import { shell } from 'electron';
import { FormGroup } from 'reactstrap';
import { YMLButtonView } from './index';

export class YMLLinkView extends Component {
    render() {
        const { name, type, keyPath, obj } = this.props;
        const props = Object.assign({}, obj, {
            color: 'link',
            onClick: () => {
                obj.link && shell.openExternal(obj.link);
            },
        });
        let newProps = {
            name,
            key: keyPath,
            keyPath: keyPath,
            type,
            obj: props,
        };

        return (
            <FormGroup key={keyPath}>
                <YMLButtonView {...newProps} />
            </FormGroup>
        );
    }
}
