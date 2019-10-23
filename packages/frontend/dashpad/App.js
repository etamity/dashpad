import React, { Component } from 'react';
import { Store } from 'common/store';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'common/libs/CombineReducers';
import LoadingSpinner from 'common/components/LoadingSpinner';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import 'common/App.scss';


// Containers
const DefaultLayout = Loadable({
    loader: () => import('common/containers/DefaultLayout'),
    loading: LoadingSpinner,
});

const Page404 = Loadable({
    loader: () => import('common/views/Pages/Page404'),
    loading: LoadingSpinner,
});

const Page500 = Loadable({
    loader: () => import('common/views/Pages/Page500'),
    loading: LoadingSpinner,
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
