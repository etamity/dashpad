import React, { Component } from 'react';
import { YMLComponent } from './components';
import { getTypes } from './components/utils';
import { Container } from 'reactstrap';
import Context from './Context';
/**
 * Yaml file entry parser
 */
export class YMLBuilder extends Component {
    componentDidMount() {
        const { schema } = this.props;
        console.log(schema)
        if (schema) {
            console.log(schema['$imports']);
        }
    }
    render() {
        const { schema } = this.props;
        return (
                getTypes(schema).map(({name, type}, index) => {
                    const newProps = {
                        type,
                        name,
                        keyPath: '',
                        obj: schema[name],
                    };
                    return (
                        <Container key={name + index} className="animated fadeIn">
                            <YMLComponent {...newProps} />
                        </Container>
                    );
                }) ||
            null
        );
    }
}
