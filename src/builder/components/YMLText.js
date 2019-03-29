import React from 'react';
import classNames from 'classnames';
import { EventsHook } from './utils';
import { YMLBase } from './YMLBase';
import { UIEvent } from './Constants';

const textClass = obj => {
    return classNames(
        obj.tag,
        {
            [`text-${obj.color}`]: !!obj.color,
            [`text-${obj.position}`]: !!obj.position,
            [`text-${obj.transform}`]: !!obj.transform,
            [`font-weight-${obj.weight}`]: !!obj.weight,
        },
        obj.className
    );
};

const allowedEvents = [UIEvent.ON_CLICK];

export class YMLTextView extends YMLBase {

    render() {
        const { keyPath, obj } = this.props;
        const assignEvents = EventsHook(this.props, allowedEvents);
        return (
            <p
                key={keyPath}
                {...obj}
                className={textClass(obj)}
                {...assignEvents}
            >
                {obj.content}
            </p>
        );
    }
}
