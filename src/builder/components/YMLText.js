import React, { Component } from 'react';
import classNames from 'classnames';
import Context from '../context';
const textClass = (obj) => {
    return classNames(obj.tag,
        {
            [`text-${obj.color}`]: !!obj.color,
            [`text-${obj.position}`]: !!obj.position,
            [`text-${obj.transform}`]: !!obj.transform,
            [`font-weight-${obj.weight}`]: !!obj.weight,
        },
        obj.className
    )
};
export class YMLTextView extends Component {
    static contextType = Context;
    render() {
        const { keyPath, obj } = this.props;
        return (
            <p
                key={keyPath}
                className={textClass(obj)}
                onClick={e => {
                    obj.onClick &&
                        this.context.vm.run(obj.onClick, {
                            props: obj,
                            e,
                        });
                }}
            >
                {obj.content}
            </p>
        );
    }
}
