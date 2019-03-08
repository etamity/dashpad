import React, { Component } from 'react';
import { Button, DropdownItem } from 'reactstrap';
import classNames from 'classnames';
import { PropsFilter, EventsHook } from './utils';

const brandClass = (brand, icon, className) => {
    return {
        brand: classNames(
            {
                [`btn-${brand}`]: !!brand,
                'btn-brand': !!brand,
                [className]: !!className,
            },
            className
        ),
        icon: classNames(
            {
                [`fa fa-${brand}`]: !!brand,
            },
            icon
        ),
    };
};
const allowedProps = [
    'size',
    'color',
    'icon',
    'outline',
    'active',
    'block',
    'disabled',
    'variant',
    'divider',
    'data-',
    'header'
];

const allowedEvents = [
    'onClick'
];

export class YMLButtonView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        const brand = brandClass(obj.brand, obj.icon, obj.className);
        const assignProps = PropsFilter(obj, allowedProps);
        const assignEvents = EventsHook(this.props, allowedEvents);
        let ButtonClass = (
            <Button
                key={keyPath}
                className={brand.brand}
                {...assignProps}
                {...assignEvents}
            >
                {(obj.icon || obj.brand) && <i className={brand.icon} />}
                {(obj.label || obj.brand) && (
                    <span className="d-none d-md-inline">
                        {obj.label || obj.brand}
                    </span>
                )}
            </Button>
        );
        if (obj.type === 'dropdown') {
            ButtonClass = (
                <DropdownItem
                    {...assignProps}
                    {...assignEvents}
                >
                    <span className="d-none d-md-inline">{obj.label}</span>
                </DropdownItem>
            );
        }

        return ButtonClass;
    }
}
