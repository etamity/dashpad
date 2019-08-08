import DashboardView from './DashboardView';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    const { route, location } = ownProps;
    const subRoutes =
        route.routes &&
        route.routes.filter(route => {
            const pathArr = route.path.split('/');
            return location.pathname.includes(pathArr[pathArr.length - 1]);
        });
    return {
        subRoutes,
        ip: state.app.system.ip,
    };
};

export const Dashboard = connect(mapStateToProps)(DashboardView);
