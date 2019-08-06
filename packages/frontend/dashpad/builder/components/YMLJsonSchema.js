import React from 'react';
import { FormGroup } from 'reactstrap';
import { YMLBase } from './YMLBase';
import SchemaTable from 'react-schema-viewer/lib/SchemaTable';

export class YMLJsonSchemaView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <FormGroup key={keyPath}>
                <SchemaTable schema={obj.schema} />
            </FormGroup>
        );
    }
}
