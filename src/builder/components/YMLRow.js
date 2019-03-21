import React from 'react';
import { Row, Col, FormGroup } from 'reactstrap';
import { YMLComponent } from './YMLComponent';
import { getTypes, PropsFilter } from './utils';
import classNames from 'classnames';
import { YMLBase } from './YMLBase';

const allowedProps = ['noGutters', 'fluid', 'data-'];

const styles = (style) => classNames(style);
export class YMLRowView extends YMLBase {
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
            const colProps = (childProps.obj && childProps.obj.col) || {};
            return (
                <Col key={childProps.key} {...colProps}>
                    <YMLComponent {...childProps} />{' '}
                </Col>
            );
        });
        const assignProps = PropsFilter(this.props, allowedProps);
        return (
            <FormGroup key={keyPath}
            >
                <Row className={styles(obj.className)} {...assignProps}>{childComps}</Row>
            </FormGroup>
        );
    }
}
