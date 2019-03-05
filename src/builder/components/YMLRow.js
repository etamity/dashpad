import React, { Component } from 'react';
import { Row, Col, FormGroup } from 'reactstrap';
import { YMLComponent } from './YMLComponent';
import { getTypes, PropsFilter } from './utils';
import classNames from 'classnames';

const allowedProps = ['data-'];

const styles = (style) => classNames(style);
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
            <FormGroup key={keyPath} className={styles(obj.className)}
            {...PropsFilter(obj, allowedProps)}
            >
                <Row>{childComps}</Row>
            </FormGroup>
        );
    }
}
