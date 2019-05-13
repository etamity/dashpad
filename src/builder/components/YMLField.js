import React from 'react';
import { FormGroup, Label, InputGroup } from 'reactstrap';
import { YMLComponent } from './YMLComponent';
import { YMLBase } from './YMLBase';
import { FieldType, isInputType } from './Constants';
import { getTypes } from './utils';

export class YMLFieldView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const subType = isInputType(obj.type) ? FieldType.INPUT : obj.type;
        let newProps = { ...this.props, type: subType };
        const childComps = getTypes(obj).map(({ name, type }, index) => {
            const childProps = {
                name,
                keyPath,
                key: keyPath + index,
                type: type,
                obj: obj[name],
            };
            return (
                <InputGroup key={childProps.key}>
                    <YMLComponent {...childProps} />{' '}
                </InputGroup>
            );
        });
        const renderChildComponent = (childComps.length > 0 && childComps) || (
                <YMLComponent {...newProps} />
        );
        return (
            <FormGroup key={keyPath}>
                {obj.title && <Label htmlFor={keyPath}>{obj.title}</Label>}
                {renderChildComponent}
            </FormGroup>
        );
    }
}
