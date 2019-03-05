import React, { Component } from 'react';
import {
    Form,
} from 'reactstrap';
import _ from 'lodash';
import { getTypes, PropsFilter } from './utils';
import {
    YMLComponent
} from './index';

const allowedProps = [
    'action',
    'method',
    'encType',
    'data-'
];

export class YMLFormView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        const pickedProps = PropsFilter(obj, allowedProps);
        return (
            <Form
                {... pickedProps}
                className="form-horizontal"
            >
                {getTypes(obj).map(({name, type}, index) => {
                    const field = obj[name];
                    const newProps = {
                        name,
                        key: keyPath + index,
                        keyPath: keyPath,
                        type,
                        obj:field,
                    };
                    return <YMLComponent {...newProps}/>;
                })}
            </Form>
        );
    }
}
