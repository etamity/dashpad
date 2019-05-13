import React from 'react';
import { Table, FormGroup } from 'reactstrap';
import { PropsFilter } from './utils';
import { YMLBase } from './YMLBase';

const allowedProps = ['responsive', 'striped'];

export class YMLTableView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const assignProps = PropsFilter(this.props, allowedProps);
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
                                    {row.map((field, i) => (
                                        <td
                                            key={
                                                keyPath +
                                                '.field.' +
                                                index +
                                                '.' +
                                                i
                                            }
                                        >
                                            {field}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </FormGroup>
        );
    }
}
