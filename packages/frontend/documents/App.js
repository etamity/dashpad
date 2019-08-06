import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from '../dashpad/store';
import { history } from 'libs/CombineReducers';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import '../dashpad/App.scss';

const loading = () => (
    <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = Loadable({
    loader: () => import('../dashpad/containers/DefaultLayout'),
    loading,
});

const Page404 = Loadable({
    loader: () => import('../dashpad/views/Pages/Page404'),
    loading,
});

const Page500 = Loadable({
    loader: () => import('../dashpad/views/Pages/Page500'),
    loading,
});
class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <ConnectedRouter history={history}>
                    <HashRouter>
                        <Switch>
                            <Route
                                exact
                                path="/404"
                                name="Page 404"
                                component={Page404}
                            />
                            <Route
                                exact
                                path="/500"
                                name="Page 500"
                                component={Page500}
                            />
                            <Route
                                path="/"
                                name="Admin Dashboard"
                                component={DefaultLayout}
                            />
                        </Switch>
                    </HashRouter>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
