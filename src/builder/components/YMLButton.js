import React from 'react';
import { Button, DropdownItem } from 'reactstrap';
import classNames from 'classnames';
import { PropsFilter, EventsHook } from './utils';
import { UIEvent } from './Constants';
import { connect } from 'react-redux';
import _ from 'lodash';
import { YMLBase } from './YMLBase';

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
    'header',
];

const allowedEvents = [UIEvent.ON_CLICK];

export class YMLButtonView extends YMLBase {
    render() {
        const { keyPath, obj, children } = this.props;
        const brand = brandClass(obj.brand, obj.icon, obj.className);
        const assignProps = PropsFilter(this.props, allowedProps);
        const assignEvents = EventsHook(this.props, allowedEvents);
        let ButtonClass = (
            <Button
                key={keyPath}
                className={brand.brand}
                {...assignProps}
                {...assignEvents}
            >
                {(obj.icon || obj.brand) && <i className={brand.icon} />}
                {(obj.label || obj.brand || children) && (
                    <span className="d-none d-md-inline">
                        {obj.label || obj.brand || children}
                    </span>
                )}
            </Button>
        );
        if (obj.type === 'dropdown') {
            ButtonClass = (
                <DropdownItem {...assignProps} {...assignEvents}>
                    <span className="d-none d-md-inline">{obj.label}</span>
                </DropdownItem>
            );
        }
        return ButtonClass;
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        obj: _.get(state.app.uiSchema, props.keyPath),
    };
};

export const YMLButton = connect(mapStateToProps)(YMLButtonView);
