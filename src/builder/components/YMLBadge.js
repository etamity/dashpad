import React, {Component} from 'react';
import { Badge } from 'reactstrap';
import { PropsFilter } from './utils';

const allowedProps = ['pill', 'color', 'icon', 'tag', 'data-'];

export class YMLBadgeView extends Component {
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
};
