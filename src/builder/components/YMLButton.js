import React, { Component } from 'react';
import { Button, DropdownItem } from 'reactstrap';
import classNames from 'classnames';
import _ from 'lodash';
import { PropsFilter } from './utils';
import Context from '../context';
const brandClass = (brand, icon, className) => {
    return {
        brand: classNames(
            {
                [`btn-${brand}`]: !!brand,
                'btn-brand': !!brand,
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
];

const allowedDropdownProps = ['header', 'diviver', 'disabled'];

export class YMLButtonView extends Component {
    static contextType = Context;
    render() {
        const { keyPath, obj } = this.props;
        const brand = brandClass(obj.brand, obj.icon, obj.className);
        let pickedProps = PropsFilter(obj, allowedProps);

        let ButtonClass = (
                <Button key={keyPath}
                    className={brand.brand}
                    {...pickedProps}
                    onClick={e => {
                        obj.onClick &&
                            this.context.vm.run(obj.onClick, {
                                props: obj,
                                e,
                            });
                    }}
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
            pickedProps = PropsFilter(obj, allowedDropdownProps);
            ButtonClass = (
                <DropdownItem
                    {...pickedProps}
                    onClick={e => {
                        obj.onClick &&
                            this.context.vm.run(obj.onClick, {
                                props: obj,
                                e,
                            });
                    }}
                >
                    <span className="d-none d-md-inline">{obj.label}</span>
                </DropdownItem>
            );
        }

        return ButtonClass;
    }
}
