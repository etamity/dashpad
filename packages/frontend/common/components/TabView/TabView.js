import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { AppAction } from 'common/reducers/app';

class TabView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.activeTab,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        AppAction.updateUIState({
            keyPath: this.props.keyPath + '.activeTab',
            value: tab,
        });
        this.setState({ activeTab: tab });
        if (this.props.onChange) {
            this.props.onChange(tab);
        }
    }

    render() {
        const tabsContent = this.props.tabs;
        let activeTab = this.state.activeTab || this.props.activeTab;
        if (!tabsContent) {
            return null;
        }

        const titles = Object.keys(tabsContent) || [];
        if (activeTab >= titles.length) {
            activeTab = 0;
        }
        const titlesView = titles.map((title, index) => {
            let label =
                title.indexOf('[') > -1
                    ? title.slice(0, title.indexOf('[')).trim()
                    : title;
            let icon = title
                .slice(title.indexOf('[') + 1, title.lastIndexOf(']'))
                .trim();
            return (
                <NavItem key={index}>
                    <NavLink
                        className={classnames({
                            active: activeTab === index,
                        })}
                        onClick={() => {
                            this.toggle(index);
                        }}
                    >
                        {icon && <i className={icon} />}
                        {label && (
                            <h6
                                style={{
                                    textTransform: 'capitalize',
                                }}
                            >
                                {label}
                            </h6>
                        )}
                    </NavLink>
                </NavItem>
            );
        });
        const tabs = titles.map((title, index) => {
            return activeTab === index ? (
                <TabPane tabId={index} key={index}>
                    {tabsContent[title]}{' '}
                </TabPane>
            ) : (
                <div key={index} />
            );
        });

        return (
            <React.Fragment>
                <Nav tabs>{titlesView}</Nav>
                <TabContent activeTab={activeTab}>{tabs}</TabContent>
            </React.Fragment>
        );
    }
}

TabView.propTypes = {
    tabs: PropTypes.object,
    activeTab: PropTypes.number,
    onChange: PropTypes.func,
};

TabView.defaultProps = {
    activeTab: 0,
};

export default TabView;
