import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

class AutoRouter extends Component {
    render() {
        const { routes, base, indexRoute } = this.props;
        const baseRoute = (base && ['/', base].join(''));
        return (
            <Switch>
                {renderRoutes(routes)}
                <Redirect
                    from={baseRoute}
                    to={indexRoute || '/dashboard'}
                />
            </Switch>
        );
    }
}

AutoRouter.propTypes = {
    index: PropTypes.string,
    base: PropTypes.string,
    routes: PropTypes.array,
};

export default AutoRouter;
