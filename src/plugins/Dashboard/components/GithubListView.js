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
                            <img className="img-thumbnail" alt={owner.login} src={owner.avatar_url} />
                            <p className="text-center">{owner.login}</p>
                        </Col>
                        <Col>
                            <ListGroupItem>
                                <ListGroupItemHeading>
                                    <YMLLinkView
                                        obj={{
                                            size: 'lg',
                                            link,
                                            label: title,
                                            color: 'primary',
                                        }}
                                    />
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

                            <Button color="danger" block>
                                {stars}{' '}
                            </Button>
                        </Col>
                    </Row>
                );
            });

        return pluginList;
    }
}
