import React from 'react';
import classNames from 'classnames';
import { EventsHook } from './utils';
import { YMLBase } from './YMLBase';
import { UIEvent } from './Constants';
import _ from 'lodash';
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
        if ( _.isObject(obj.content)) {
            obj.content = JSON.stringify(obj.content, null, 2);
        }
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
