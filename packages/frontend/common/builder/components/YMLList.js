import React from 'react';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    FormGroup,
} from 'reactstrap';
import { PropsFilter, EventsHook, getTypes } from './utils';
import { YMLBase } from './YMLBase';
import { YMLComponent } from './YMLComponent';
import { UIEvent, ContentType } from './Constants';
import _ from 'lodash';
import classNames from 'classnames';

const allowedProps = [
    'action',
    'disabled',
    'tag',
    'href',
    'color',
    'active',
    'className',
    'data-',
];

const allowedEvents = [UIEvent.ON_CLICK];

export class YMLListItemView extends YMLBase {
    render() {
        const { keyPath, name, obj } = this.props;
        const assignEvents = EventsHook(this.props, allowedEvents);
        const assignProps = PropsFilter(this.props, allowedProps);
        const childComponents = getTypes(obj).map(({ name, type }, index) => {
            const newProps = {
                name,
                keyPath: keyPath,
                key: keyPath + index,
                type: type,
                obj: obj[name],
            };
            return <YMLComponent {...newProps} />;
        });
        return (
            <ListGroupItem
                action
                key={keyPath + name}
                className={obj._activeClass}
                {...assignProps}
                {...assignEvents}
            >
                {obj.title && (
                    <ListGroupItemHeading>
                        <div>{obj.title} </div>
                    </ListGroupItemHeading>
                )}
                {obj.description && (
                    <ListGroupItemText>{obj.description}</ListGroupItemText>
                )}
                {_.isString(obj.content) && obj.content}
                {childComponents}
            </ListGroupItem>
        );
    }
}

export class YMLListView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const { items } = obj;
        const list =
            items &&
            items.map((item, index) => {
                const filterEvents = Object.keys(obj)
                    .filter(key => allowedEvents.includes(key))
                    .map(key => ({ [key]: obj[key] }));
                const _activeClass = classNames({
                    [`list-group-item-accent-${obj.variant ||
                        'success'}`]: true,
                    active: obj.active === index,
                });
                const newProps = {
                    name: 'items.' + index,
                    key: keyPath + '.items.' + index,
                    keyPath,
                    type: ContentType.LISTITEM,
                    obj: {
                        ...filterEvents,
                        _activeClass,
                        ...(_.isString(item) && { content: item }),
                    },
                };

                return <YMLComponent {...newProps} />;
            });
        return (
            <FormGroup key={keyPath} className={obj.className}>
                <ListGroup className="list-group-accent" tag="div">
                    {list}
                </ListGroup>
            </FormGroup>
        );
    }
}
