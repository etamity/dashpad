import React, {Component} from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter } from './utils';

const allowedProps = ['name', 'id', 'multiple', 'type','bsSize', 'state', 'valid', 'plaintext', 'addon', 'data-'];

export class YMLSelectView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        const id = `${obj.multiple ? 'multiple-' : ''}select-` + keyPath;
        const options =
        obj &&
        obj.options.map((option, index) => (
                <option key={`${keyPath}.${index}`} value={index}>
                    {option}
                </option>
            ));
        const defaultProps = Object.assign(
            {},
            {
                type: 'select',
                id: id,
                name: id,
            },
            obj
        );
        return (
            <FormGroup key={keyPath} row>
                <Col md="3">
                    <Label htmlFor={id}>{obj.title}</Label>
                </Col>
                <Col md="9">
                    <Input
                        {...PropsFilter(defaultProps, allowedProps)}
                    >
                        {options}
                    </Input>
                </Col>
            </FormGroup>
        );
    }
};
