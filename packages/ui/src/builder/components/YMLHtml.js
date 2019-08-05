import React from 'react';
import { FormGroup } from 'reactstrap';
import { YMLBase } from './YMLBase';

export class YMLHtmlView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <FormGroup key={keyPath}>
                <div dangerouslySetInnerHTML={{ __html: obj.content }} />
            </FormGroup>
        );
    }
}
