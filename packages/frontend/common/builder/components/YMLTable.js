import React from 'react';
import _ from 'lodash';
import { Table, FormGroup } from 'reactstrap';
import { PropsFilter, getTypes } from './utils';
import { YMLComponent } from './index';
import { YMLBase } from './YMLBase';

const allowedProps = ['responsive', 'striped', 'hover'];

export class YMLTableView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const assignProps = PropsFilter(this.props, allowedProps);
        
        const controls = (field) => {
            if (!_.isPlainObject(field)) {
                return field;
            } else {
                return getTypes(field).map(({ name, type }, index) => {
                    const childProps = {
                        name,
                        keyPath: keyPath,
                        key: keyPath + index,
                        type: type,
                        obj: field[name],
                    };
                    return <YMLComponent key={keyPath} {...childProps} />;
                })
            }
        };

        const renderRow = (row, index) => {
            if (_.isArray(row)) {
                return row.map((field, i) => (
                    <td
                        key={
                            keyPath +
                            '.field.' +
                            index +
                            '.' +
                            i
                        }
                    >
                        {controls(field)}
                    </td>
                ));
            } else {
                return <td {...row.col}>{controls(row)}</td>
            }
           
        }
        return (
            <FormGroup key={keyPath}>
                <Table responsive striped {...assignProps}>
                    <thead>
                        <tr>
                            {obj.labels &&
                                obj.labels.map((label, index) => (
                                    <th key={keyPath + '.label.' + index}>
                                        {label}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {obj.dataset &&
                            obj.dataset.map((row, index) => (
                                <tr key={keyPath + '.row.' + index}>
                                    {renderRow(row, index)}
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </FormGroup>
        );
    }
}
