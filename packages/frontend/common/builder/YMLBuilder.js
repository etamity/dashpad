import React, { Component } from 'react';
import { YMLComponent } from './components';
import { getTypes } from './components/utils';
import { Container } from 'reactstrap';

/**
 * Yaml file entry parser
 */
export class YMLBuilder extends Component {
    render() {
        const { schema } = this.props;
        return (
            getTypes(schema).map(({ name, type }, index) => {
                const newProps = {
                    type,
                    name,
                    keyPath: '',
                    obj: schema[name],
                };
                return (
                    <Container
                        key={type + '_' + index + '_' + name}
                        className="animated fadeIn"
                    >
                        <YMLComponent {...newProps} />
                    </Container>
                );
            }) || null
        );
    }
}
