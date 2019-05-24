import React from 'react';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    FormGroup,
} from 'reactstrap';
import _ from 'lodash';
import { PropsFilter, EventsHook, getTypes } from './utils';
import { YMLBase } from './YMLBase';
import { YMLComponent } from './YMLComponent';

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

const allowedEvents = [UIEvent.ON_CLICK];

export const YMLListContentView = ({obj}) => (
    <React.Fragment>
        {obj.title && (
            <ListGroupItemHeading>
                <div>{obj.title} </div>
            </ListGroupItemHeading>
        )}
        {obj.description && <ListGroupItemText>{obj.description}</ListGroupItemText>}
    </React.Fragment>
);

export class YMLListView extends YMLBase {
    
    render() {
        const { keyPath, obj } = this.props;
        const { items } = obj;
        let classes = {};
        const list =
            items &&
            items.map((item, index) => {
                classes = {
                    itemClass: classNames({
                        [`list-group-item-accent-${item.variant ||
                            'success'}`]: true,
                        active: obj.selected === index,
                    }),
                };
                const assignProps = PropsFilter(this.props, allowedProps);
                const assignEvents = EventsHook(this.props, allowedEvents);

                const content = getTypes(item).map(({ name, type }, index) => {
                    const field = item[name];
                    const newProps = {
                        name,
                        key: keyPath + index,
                        keyPath: keyPath,
                        type,
                        obj: field,
                    };
                    return <YMLComponent {...newProps} {...assignProps}
                    {...assignEvents} />;
                })
                return (
                    <ListGroupItem
                        action
                        key={keyPath + index}
                        className={classes.itemClass}
                    >
                        {content.length > 0 ? content : item}
                    </ListGroupItem>
                );
            });
        
        return (
            <FormGroup key={keyPath}>
                <ListGroup className="list-group-accent" tag="div">
                    {list}
                </ListGroup>
            </FormGroup>
        );
    }
}
