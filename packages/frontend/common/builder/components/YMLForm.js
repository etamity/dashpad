import _ from 'lodash';
import React from 'react';
import { Form } from 'reactstrap';
import { getTypes, PropsFilter, EventsHook } from './utils';
import { YMLComponent } from './index';
import { YMLBase } from './YMLBase';
import { UIEvent } from './Constants';
import SchemaForm from 'react-jsonschema-form';

const allowedProps = [
    'action',
    'method',
    'encType',
    'data-',
    'schema',
    'formData',
];
const allowedEvents = [UIEvent.ON_CHANGE, UIEvent.ON_SUBMIT, UIEvent.ON_ERROR];
export class YMLFormView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const pickedProps = PropsFilter(this.props, allowedProps);
        const assignEvents = EventsHook(this.props, allowedEvents);
        if (obj.schema && obj.formData) {
            const filters = Object.keys(obj.formData);
            obj.schema.properties = _.pickBy(
                obj.schema.properties,
                (val, key) => {
                    return filters.some(filter => key.indexOf(filter) > -1);
                }
            );
        }
        return obj.schema ? (
            <SchemaForm
                schema={obj.schema}
                formData={obj.formData}
                {...assignEvents}
            >
                <div />
            </SchemaForm>
        ) : (
            <Form {...pickedProps} className="form-horizontal">
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
            </Form>
        );
    }
}
