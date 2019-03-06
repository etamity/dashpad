import React, {Component} from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter } from './utils';

const allowedProps = ['name', 'id', 'type', 'bsSize', 'state', 'valid', 'plaintext', 'addon', 'data-'];

export class YMLRadioView extends Component {
 render() {
    const { keyPath, obj } = this.props;
    const options =
    obj &&
    obj.options.map((option, index) => {
            const idkey = `${keyPath}.${index}`;
            const defaultProps = Object.assign(
                {},
                {
                    type: 'radio',
                    id: idkey,
                    name: keyPath,
                },
                obj
            );
            const assignProps = PropsFilter(defaultProps, allowedProps);
            return (
                <FormGroup
                    key={idkey}
                    check
                    inline={obj.inline}
                >
                    <Input
                        {...assignProps}
                    />
                    <Label
                        check
                        htmlFor={idkey}
                    >
                        {option}
                    </Label>
                </FormGroup>
            );
        });
    return (
        <FormGroup key={keyPath} row>
            <Col md="3">
                <Label>{obj.title}</Label>
            </Col>
            <Col md="9">{options}</Col>
        </FormGroup>
    );
 }
};
