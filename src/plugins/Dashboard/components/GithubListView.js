import React, { Component } from 'react';
import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Col,
    Button,
} from 'reactstrap';
import { YMLLinkView } from 'builder/components/index';

export class GithubListView extends Component {
    render() {
        const { items } = this.props;
        const pluginList =
            items &&
            items.map((content, index) => {
                const { title, description, link, stars, owner, raw } = content;
                return (
                    <Row key={index}>
                        <Col md="1">
                            <img
                                className="img-thumbnail"
                                alt={''}
                                src={owner.avatar_url}
                            />
                            <p className="text-center">{owner.login}</p>
                        </Col>
                        <Col>
                            <ListGroupItem>
                                <ListGroupItemHeading>
                                    <Row className="d-flex justify-content-between">
                                        <YMLLinkView
                                            obj={{
                                                size: 'lg',
                                                link,
                                                label: title,
                                                color: 'primary',
                                            }}
                                        />
                                        <Button className="text-right" outline color="success">
                                            <i className="fa fa-star fa-lg" />{' '}
                                            {stars}
                                        </Button>
                                    </Row>
                                </ListGroupItemHeading>
                                <ListGroupItemText>
                                    {description}
                                </ListGroupItemText>
                            </ListGroupItem>
                        </Col>
                        <Col md="2">
                            <Button color="primary" block>
                                {' '}
                                Install{' '}
                            </Button>
                            <Button color="danger" block>
                                {' '}
                                Uninstall{' '}
                            </Button>
                        </Col>
                    </Row>
                );
            });

        return pluginList;
    }
}
