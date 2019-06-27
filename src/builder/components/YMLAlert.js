import React from 'react';
import { Alert, FormGroup } from 'reactstrap';
import { getTypes, PropsFilter } from './utils';
import { YMLBase } from './YMLBase';
import { YMLComponent } from './index';

const allowedProps = [
    'color',
    'data-',
];

export class YMLAlertView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const assignProps = PropsFilter(this.props, allowedProps);
        return (
            <FormGroup key={keyPath}>
                <Alert {...assignProps}>
                {getTypes(obj).map(({ name, type }, index) => {
                    const field = obj[name];
                    const newProps = {
                        name,
                        key: keyPath + index,
                        keyPath: keyPath,
                        type,
                        obj: field,
                    };
                    return <YMLComponent {...newProps} />;
                })}
                </Alert>
            </FormGroup>
        );
    }
}
