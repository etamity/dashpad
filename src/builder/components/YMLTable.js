import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { PropsFilter } from './utils';
const allowedProps = ['responsive', 'striped'];

export class YMLTableView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <Table
                responsive
                striped
                key={keyPath}
                {...PropsFilter(obj, allowedProps)}
            >
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
                    {obj.rows &&
                        obj.rows.map((row, index) => (
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
        );
    }
}
