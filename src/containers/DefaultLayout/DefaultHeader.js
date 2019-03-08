import React, { Component } from 'react';
import classNames from 'classnames';
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink as RsNavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
    AppAsideToggler,
    AppHeaderDropdown,
    AppNavbarBrand,
    AppSidebarToggler,
} from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/dashboard.svg';

const propTypes = {
    children: PropTypes.node,
    navs: PropTypes.array,
};

const defaultProps = {};

class DefaultHeader extends Component {
    navBadge(badge) {
        if (badge) {
            const classes = classNames(badge.class);
            return (
                <Badge className={classes} color={badge.variant}>
                    {badge.text}
                </Badge>
            );
        }
        return null;
    }
    isExternal(url) {
        const link = url ? url.substring(0, 4) : '';
        return link === 'http';
    }
    navLink(item, key, classes) {
        const url = item.url || '';
        const itemIcon = <i className={classes.icon} />;
        const itemBadge = this.navBadge(item.badge);
        const attributes = item.attributes || {};
        return (
            <NavItem key={key} className={classes.item}>
                {attributes.disabled ? (
                    <RsNavLink
                        href={''}
                        className={classes.link}
                        {...attributes}
                    >
                        {itemIcon}
                        {item.name}
                        {itemBadge}
                    </RsNavLink>
                ) : this.isExternal(url) ? (
                    <RsNavLink
                        href={url}
                        className={classes.link}
                        active
                        {...attributes}
                    >
                        {itemIcon}
                        {item.name}
                        {itemBadge}
                    </RsNavLink>
                ) : (
                    <NavLink
                        to={url}
                        className={classes.link}
                        activeClassName="active"
                        onClick={this.hideMobile}
                        {...attributes}
                    >
                        {itemIcon}
                        {item.name}
                        {itemBadge}
                    </NavLink>
                )}
            </NavItem>
        );
    }
    dropdownLink(item, key, classes) {
        const itemIcon = <i className={classes.icon} />;
        const itemBadge = this.navBadge(item.badge);
        const attributes = item.attributes || {};
        return item.title ? (
            <DropdownItem
                key={key}
                header
                tag="div"
                className="text-center"
                {...attributes}
            >
                <strong>{item.name}</strong>
            </DropdownItem>
        ) : (
            <DropdownItem key={key}>
                {itemIcon}
                {item.name}
                {itemBadge}
            </DropdownItem>
        );
    }
    render() {
        // eslint-disable-next-line
        const {
            children,
            navs,
            rightNavs,
            showToggle,
            ...attributes
        } = this.props;
        const openAside = this.props.processes.length > 0;
        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand
                    full={{
                        src: logo,
                        width: 89,
                        height: 25,
                        alt: 'CoreUI Logo',
                    }}
                    minimized={{
                        src: sygnet,
                        width: 30,
                        height: 30,
                        alt: 'CoreUI Logo',
                    }}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg" />

                <Nav className="d-md-down-none" navbar>
                    {navs &&
                        navs.map((item, index) => {
                            const classes = {
                                item: classNames(item.class),
                                link: classNames(
                                    'nav-link',
                                    item.variant
                                        ? `nav-link-${item.variant}`
                                        : ''
                                ),
                            };
                            return this.navLink(item, index, classes);
                        })}
                </Nav>
                <Nav className="ml-auto" navbar>
                    {rightNavs &&
                        rightNavs
                            .filter(item => item.type !== 'dropdown')
                            .map((item, index) => {
                                const classes = {
                                    item: classNames('d-md-down-none'),
                                    link: classNames(
                                        'nav-link',
                                        item.variant
                                            ? `nav-link-${item.variant}`
                                            : ''
                                    ),
                                    icon: classNames('nav-icon', item.icon),
                                };
                                return this.navLink(item, index, classes);
                            })}
                    {rightNavs &&
                        rightNavs
                            .filter(item => item.type === 'dropdown')
                            .map((item, index) => {
                                const dropdownItems =
                                    item.children &&
                                    item.children.map((item, index) => {
                                        const classes = {
                                            item: classNames('d-md-down-none'),
                                            link: classNames(
                                                'nav-link',
                                                item.variant
                                                    ? `nav-link-${item.variant}`
                                                    : ''
                                            ),
                                            icon: classNames(item.icon),
                                        };
                                        return this.dropdownLink(
                                            item,
                                            index,
                                            classes
                                        );
                                    });
                                return (
                                    <AppHeaderDropdown
                                        key={index}
                                        direction="down"
                                    >
                                        <DropdownToggle nav>
                                            <img
                                                src={item.avatar}
                                                className="img-avatar"
                                                alt="Avatar"
                                            />
                                        </DropdownToggle>
                                        <DropdownMenu
                                            right
                                            style={{ right: 'auto' }}
                                        >
                                            {dropdownItems}
                                        </DropdownMenu>
                                    </AppHeaderDropdown>
                                );
                            })}
                </Nav>
                {showToggle && (
                    <AppAsideToggler
                        defaultOpen={openAside}
                        className="d-md-down-none"
                    >
                        <i className="icon-layers" />
                    </AppAsideToggler>
                )}
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
