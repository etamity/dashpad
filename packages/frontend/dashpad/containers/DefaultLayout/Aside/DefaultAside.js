import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Progress } from 'reactstrap';
import PropTypes from 'prop-types';
import TabView from 'components/TabView';
import { Remote } from 'libs/Remote';
import { AppAction } from 'reducers/app';
const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

const { ProcessManager } = Remote();

class DefaultAside extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: props.activeTab,
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;
        const messageBold = bold => (
            <h6>
                Are you sure to kill process pid <b>{bold}</b> ?
            </h6>
        );
        const ProcessTaskItem = (item, index) => (
            <ListGroupItem
                key={index}
                className="list-group-item-accent-warning list-group-item-divider"
            >
                <div className="float-right">
                    <Button
                        size="sm"
                        color="danger"
                        onClick={() => {
                            AppAction.showModal({
                                title: 'Kill Process',
                                message: messageBold(item.pid),
                                variant: 'danger',
                                onConfirm: () => {
                                    ProcessManager.kill(item.pid);
                                },
                            });
                        }}
                    >
                        {' '}
                        <i className="icon-close" />
                    </Button>
                </div>
                <div>
                    <strong>{item.packageName}</strong>{' '}
                </div>
                <small className="text-muted mr-3">
                    <i className="icon-calendar" />{' '}
                    <strong>{item.script}</strong>
                </small>
                <small className="text-muted">
                    <i className="icon-location-pin" /> V{' '}
                    {item.packageJson.version}
                </small>
                <Progress
                    animated
                    color="success"
                    value="100"
                    className="mt-3"
                />
            </ListGroupItem>
        );

        const ProcessListView = this.props.processes.map((item, index) => {
            return ProcessTaskItem(item, index);
        });
        ProcessListView.unshift(
            <ListGroupItem
                key={'title-index-0'}
                className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small"
            >
                All Running Tasks
            </ListGroupItem>
        );

        const ProcessListGoup = (
            <ListGroup className="list-group-accent" tag={'div'}>
                {' '}
                {ProcessListView}{' '}
            </ListGroup>
        );
        const tabs = {
            '[icon-list]': ProcessListGoup,
        };
        return (
            <React.Fragment>
                <TabView tabs={tabs} />
            </React.Fragment>
        );
    }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
