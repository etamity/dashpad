import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { AppAction } from 'reducers/app';

class TabView extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.props.activeTab !== tab) {
            AppAction.updateUIState({
                keyPath: this.props.keyPath + '.activeTab',
                value: tab,
            });
            if (this.props.onChange) {
                this.props.onChange(tab);
            }
        }
    }

    render() {
        const tabsContent = this.props.tabs;
        if (!tabsContent) {
            return null;
        }

        const titles = Object.keys(tabsContent) || [];
        const titlesView = titles.map((title, index) => {
            let label = title.indexOf('[') > -1 ? title.slice(0, title.indexOf('[')).trim() : title;
            let icon = title
                .slice(title.indexOf('[') + 1, title.lastIndexOf(']'))
                .trim();
            return (
                <NavItem key={index}>
                    <NavLink
                        className={classnames({
                            active: this.props.activeTab === index,
                        })}
                        onClick={() => {
                            this.toggle(index);
                        }}
                    >
                        {icon && <i className={icon} />}
                        {label && (
                            <h6
                                style={{
                                    textTransform: 'capitalize'
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
            return this.props.activeTab === index ? (
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
                <TabContent activeTab={this.props.activeTab}>{tabs}</TabContent>
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
    activeTab: 0
}

export default TabView;
