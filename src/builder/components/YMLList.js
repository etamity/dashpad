import React from 'react';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    FormGroup,
} from 'reactstrap';
import _ from 'lodash';
import { PropsFilter } from './utils';
import { YMLBase } from './YMLBase';
import { YMLBadgeView } from './index';

import classNames from 'classnames';

const allowedProps = [
    'action',
    'disabled',
    'tag',
    'href',
    'color',
    'active',
    'data-',
];
export class YMLListView extends YMLBase {
    render() {
        const { name, type, keyPath, obj } = this.props;
        const { items } = obj;
        const list =
            items &&
            items.map((item, index) => {
                const parseContent = content => {
                    if (_.isPlainObject(item.content)) {
                        const view = (
                            <React.Fragment>
                                {content.title && (
                                    <ListGroupItemHeading>
                                        <div>{content.title} </div>
                                    </ListGroupItemHeading>
                                )}
                                {content.description && (
                                    <ListGroupItemText>
                                        {content.description}
                                    </ListGroupItemText>
                                )}
                            </React.Fragment>
                        );
                        return view;
                    }
                    return item.content;
                };

                let content = item;
                let classes = {};
                let newProps = {};
                if (_.isPlainObject(item)) {
                    content = parseContent(item.content);
                    classes = {
                        itemClass: classNames({
                            [`list-group-item-accent-${item.variant ||
                                'success'}`]: true,
                            active: obj.selected === index,
                        }),
                    };
                    newProps = {
                        name,
                        keyPath: keyPath,
                        type,
                        obj: item.Badge,
                    };
                    if (!item.color && index % 2 === 0) {
                        item.color = 'info';
                    }
                }
                const assignProps = PropsFilter(this.props, allowedProps);
                return (
                    <ListGroupItem
                        action
                        key={keyPath + index}
                        className={classes.itemClass}
                        {...assignProps}
                    >
                        {content}{' '}
                        {item && item.Badge && <YMLBadgeView {...newProps} />}
                    </ListGroupItem>
                );
            });
        return (
            <FormGroup key={keyPath}>
                <ListGroup className="list-group-accent" tag={'div'}>
                    {list}
                </ListGroup>
            </FormGroup>
        );
    }
}
