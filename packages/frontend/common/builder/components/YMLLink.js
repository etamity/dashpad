import React from 'react';
import { FormGroup } from 'reactstrap';
import { YMLButtonView } from './index';
import { YMLBase } from './YMLBase';

export class YMLLinkView extends YMLBase {
    render() {
        const { name, type, keyPath, obj } = this.props;
        const props = { ...obj, color: 'link' };
        let newProps = {
            name,
            key: keyPath,
            keyPath: keyPath,
            type,
            obj: props,
        };

        return (
            <FormGroup key={keyPath}>
                <YMLButtonView {...newProps} children={this.props.children} />
            </FormGroup>
        );
    }
}
