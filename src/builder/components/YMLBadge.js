import React, {Component} from 'react';
import { Badge } from 'reactstrap';
import { PropsFilter } from './utils';
const allowedProps = ['pill', 'color', 'icon', 'tag'];

export class YMLBadgeView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <Badge
                key={keyPath}
                className="float-right"
                {...PropsFilter(obj, allowedProps)}
            >
                {obj.label}
            </Badge>
        );
    }
};
