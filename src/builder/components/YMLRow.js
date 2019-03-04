import React, { Component } from 'react';
import { Row, Col, FormGroup } from 'reactstrap';
import { YMLComponent } from './YMLComponent';
import { getTypes } from './utils';
export class YMLRowView extends Component {
    render() {
        const { keyPath, obj } = this.props;

        const childComps = getTypes(obj).map(({ name, type }, index) => {
            const childProps = {
                name,
                keyPath,
                key: keyPath + index,
                type: type,
                obj: obj[name],
            };
            return (
                <Col key={childProps.key}>
                    <YMLComponent {...childProps} />{' '}
                </Col>
            );
        });
        return (
            <FormGroup key={keyPath}>
                <Row>{childComps}</Row>
            </FormGroup>
        );
    }
}
