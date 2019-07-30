import React, { Component, Suspense } from 'react';
import Document from './pages/index.mdx';
import Loadable from 'react-loadable';
import '../App.scss';
// const loading = () => (
//     <div className="animated fadeIn pt-3 text-center">Loading...</div>
// );

// const DefaultLayout = Loadable({
//     loader: () => import('../src/containers/DefaultLayout'),
//     loading,
// });
const routes = [
    {
        name: 'Settings',
        url: '/dashboard/settingsview',
        icon: 'icon-settings',
        badge: {
            variant: 'info',
            text: 'NEW',
        }
    }
]
class App extends Component {
    render() {
        return (
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <div>
                        <h1>ads</h1>
                        <Document />
                    </div>
                </Suspense>
            </div>
        );
    }
}
export default App;
