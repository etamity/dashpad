import React, { Component } from 'react';
import {
    Form,
} from 'reactstrap';
import _ from 'lodash';
import { getTypes } from './utils';
import {
    YMLComponent
} from './index';

export class YMLFormView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <Form
                action=""
                method="post"
                encType="multipart/form-data"
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
