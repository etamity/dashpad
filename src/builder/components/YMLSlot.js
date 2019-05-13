import React from 'react';
import { YMLComponent } from './index';
import { getTypes } from './utils';
import { YMLBase } from './YMLBase';

export class YMLSlotView extends YMLBase {
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

        return (
            <React.Fragment key={keyPath}>
                {controls.map(comp => comp)}
            </React.Fragment>
        );
    }
}
