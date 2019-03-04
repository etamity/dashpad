import React, { Component } from 'react';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    FormGroup,
} from 'reactstrap';
import _ from 'lodash';
import { PropsFilter } from './utils';

import { YMLBadgeView } from './index';

import classNames from 'classnames';

const allowedProps = ['action', 'disabled', 'tag', 'href', 'color', 'active'];
export class YMLListView extends Component {
    render() {
        const { name, type, keyPath, obj } = this.props;
        const { items } = obj;
        const list =
            items &&
            items.map((item, index) => {
                const parseContent = content => {
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
                    return _.isObject(item.content) ? view : item.content;
                };

                let content = item;
                let classes = {};
                let newProps = {};
                if (_.isObject(item)) {
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

                return (
                    <ListGroupItem
                        action
                        key={keyPath + index}
                        className={classes.itemClass}
                        {...PropsFilter(item, allowedProps)}
                    >
                        {content} {item.Badge && <YMLBadgeView {...newProps} />}
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
