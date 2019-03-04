import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';
export class YMLHtmlView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <FormGroup key={keyPath}>
                <div dangerouslySetInnerHTML={{ __html: obj.content }} />
            </FormGroup>
        );
    }
}
