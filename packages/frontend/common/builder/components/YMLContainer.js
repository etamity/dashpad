import React from 'react';
import { Container } from 'reactstrap';

import { YMLComponent } from './index';
import { getTypes } from './utils';
import { YMLBase } from './YMLBase';

export class YMLContainerView extends YMLBase {
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
                <Container>{controls.map(comp => comp)}</Container>
            </React.Fragment>
        );
    }
}
