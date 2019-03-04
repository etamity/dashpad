import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
class TabView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.activeTab || 0,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
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
            let labelArr = title.split('.');
            let label = labelArr[0] || null;
            let icon = labelArr.length >= 2 && labelArr[labelArr.length - 1];
            return (
                <NavItem key={index}>
                    <NavLink
                        className={classnames({
                            active: this.state.activeTab === index,
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
                                    cursor: 'default',
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
            return this.state.activeTab === index ? (
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
                <TabContent activeTab={this.state.activeTab}>{tabs}</TabContent>
            </React.Fragment>
        );
    }
}

TabView.propTypes = {
    tabs: PropTypes.object,
    onChange: PropTypes.func,
};

export default TabView;
