import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

class AutoRouter extends Component {
    render() {
        const { routes, base, indexRoute } = this.props;
        const baseRoute = (base && ['/', base].join('')) || '/#/';
        return (
            <Switch>
                {indexRoute && <Redirect
                    push
                    from={baseRoute}
                    to={indexRoute}
                />}
                {renderRoutes(routes)}
            </Switch>
        );
    }
}

AutoRouter.propTypes = {
    index: PropTypes.string,
    base: PropTypes.string,
    routes: PropTypes.array,
};

export const currentRoute = (routes, pathname) => {
    return (
        routes &&
        routes.find(route => {
            return pathname.includes(route.path);
        })
    );
};

export default AutoRouter;
