import React, {Component} from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter } from './utils';

const allowedProps = ['name', 'id', 'type','bsSize', 'state', 'valid', 'plaintext', 'addon'];

export class YMLCheckboxView extends Component {
    render() {
        const { keyPath, obj } = this.props;

        const options =
        obj &&
        obj.options.map((option, index) => {
            const idkey = keyPath + index;
            const id = 'nf-checkbox-' + index;
            const defaultProps = Object.assign(
                {},
                {
                    type: 'checkbox',
                    id: id,
                    name: id,
                },
                obj
            );

            return (
                <FormGroup
                    key={idkey}
                    check
                    inline={obj.inline}
                >
                    <Input
                        {...PropsFilter(defaultProps, allowedProps)}
                    />
                    <Label
                        check
                        htmlFor={id}
                    >
                        {option}
                    </Label>
                </FormGroup>
            );
        });

    return (
        <FormGroup row>
            <Col md="3">
                <Label>{obj.title}</Label>
            </Col>
            <Col md="9">{options}</Col>
        </FormGroup>
    );
    }
};
