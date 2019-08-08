import React from 'react';
import { Collapse } from 'reactstrap';

import { YMLComponent } from './index';
import { EventsHook, getTypes, PropsFilter } from './utils';
import { YMLBase } from './YMLBase';
import { UIEvent } from './Constants';
const allowedProps = [
    'isOpen',
    'appear',
    'enter',
    'exit',
    'tag',
    'timeout',
    'data-',
    'className',
];

const allowedEvents = [
    UIEvent.ON_ENTERING,
    UIEvent.ON_ENTERED,
    UIEvent.ON_EXITED,
    UIEvent.ON_EXITING,
];

export class YMLCollapseView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const controls = getTypes(obj).map(({ name, type }, index) => {
            const childProps = {
                name,
                keyPath: keyPath,
                key: keyPath + index,
                type: type,
                obj: obj[name],
            };
            return <YMLComponent key={keyPath} {...childProps} />;
        });
        const assignProps = PropsFilter(this.props, allowedProps);
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
