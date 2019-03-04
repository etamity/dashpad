import React, { Component } from 'react';
import { YMLComponent } from './components';
import { isFirstLetterIsUpper } from './components/utils';
import { Container } from 'reactstrap';
/**
 * Yaml file entry parser
 */
export class YMLBuilder extends Component {
    render() {
        const { schema } = this.props;
        return (
            (schema &&
                Object.keys(schema).map(name => {
                    const type =
                        name &&
                        isFirstLetterIsUpper(name) &&
                        name.split('_')[0];
                    const newProps = {
                        type,
                        name,
                        keyPath: '',
                        obj: schema[name],
                    };
                    return (
                        <Container key={name} className="animated fadeIn">
                            <YMLComponent {...newProps} />
                        </Container>
                    );
                })) ||
            null
        );
    }
}
