import React, { Component } from 'react';
import { Row, Col, Label, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import _ from 'lodash';
import { YMLComponent } from './index';
import { getTypes } from './utils';
import { YMLBase } from './YMLBase';

export class YMLCardHeaderView extends YMLBase {
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
            return {
                type: childProps.type,
                position: childProps.obj.position,
                view: <YMLComponent {...childProps} />,
            };
        });
        const headLeft = _.filter(childComps, { position: 'left' }).map(
            comp => comp.view
        );
        const headRight = _.filter(childComps, { position: 'right' }).map(
            comp => comp.view
        );
        const headMid = _.filter(childComps, { position: 'middle' }).map(
            comp => comp.view
        );
        return (
            <CardHeader>
                <Row>
                    <Col className="d-flex justify-content-start align-items-center">
                        {headLeft}
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        {obj.title && (
                            <Label>
                                <b>{obj.title}</b>
                            </Label>
                        )}
                        {headMid}
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        {headRight}
                    </Col>
                </Row>
            </CardHeader>
        );
    }
}

export class YMLCardFooterView extends YMLBase {
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
            return {
                type: childProps.type,
                position: childProps.obj.position,
                view: <YMLComponent {...childProps} />,
            };
        });
        const headLeft = _.filter(childComps, { position: 'left' }).map(
            comp => comp.view
        );
        const headRight = _.filter(childComps, { position: 'right' }).map(
            comp => comp.view
        );
        const headMid = _.filter(childComps, { position: 'middle' }).map(
            comp => comp.view
        );
        return (
            <CardFooter>
                <Row>
                    <Col className="d-flex justify-content-start align-items-center">
                        {headLeft}
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        {obj.title && (
                            <Label>
                                <b>{obj.title}</b>
                            </Label>
                        )}
                        {headMid}
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        {headRight}
                    </Col>
                </Row>
            </CardFooter>
        );
    }
}

export class YMLCardView extends Component {
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
            return {
                type: childProps.type,
                view: <YMLComponent key={keyPath} {...childProps} />,
            };
        });

        return (
            <React.Fragment key={keyPath}>
                <Card>
                    {_.filter(controls, { type: 'Header' }).map(
                        comp => comp.view
                    )}
                    <CardBody className={obj.className}>
                        {obj.description && <p> {obj.description} </p>}
                        {controls
                            .filter(ctrl => ctrl.type !== 'Header' && ctrl.type !== 'Footer')
                            .map(comp => comp.view)}
                    </CardBody>
                    {_.filter(controls, { type: 'Footer' }).map(
                        comp => comp.view
                    )}
                </Card>
            </React.Fragment>
        );
    }
}
