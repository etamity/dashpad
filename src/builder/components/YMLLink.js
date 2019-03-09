import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';
import { YMLButtonView } from './index';

export class YMLLinkView extends Component {
    render() {
        const { name, type, keyPath, obj } = this.props;
        const props = Object.assign({}, obj, {
            color: 'link',
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
                <YMLButtonView {...newProps} children={this.props.children}/>
            </FormGroup>
        );
    }
}
