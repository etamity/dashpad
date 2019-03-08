import React, { Component } from 'react';
import { Collapse } from 'reactstrap';

import { YMLComponent } from './index';
import { EventsHook, getTypes, PropsFilter } from './utils';

const allowedProps = [
    'isOpen',
    'appear',
    'enter',
    'exit',
    'tag',
    'timeout',
    'data-',
    'className'
];

const allowedEvents = [
    'onEntering',
    'onEntered',
    'onExiting',
    'onExited'
];

export class YMLCollapseView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        const controls = getTypes(obj).map(({name, type}, index) => {
            const childProps = {
                name,
                keyPath: keyPath,
                key: keyPath + index,
                type: type,
                obj: obj[name],
            };
            return <YMLComponent key={keyPath} {...childProps} />
        });
        const assignProps = PropsFilter(obj, allowedProps);
        const assignEvents = EventsHook(this.props, allowedEvents);

        return (
            <React.Fragment key={keyPath}>
                <Collapse {...assignProps} {...assignEvents}>
                    {controls.map(comp => comp)}
                </Collapse>
            </React.Fragment>
        );
    }
}
