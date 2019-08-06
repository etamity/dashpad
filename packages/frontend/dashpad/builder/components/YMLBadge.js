import React from 'react';
import { Badge } from 'reactstrap';
import { PropsFilter } from './utils';
import { YMLBase } from './YMLBase';

const allowedProps = ['pill', 'color', 'icon', 'tag', 'data-'];

export class YMLBadgeView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <Badge
                key={keyPath}
                className="float-right"
                {...PropsFilter(this.props, allowedProps)}
            >
                {obj.label}
            </Badge>
        );
    }
}
