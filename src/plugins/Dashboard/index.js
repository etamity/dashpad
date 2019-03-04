import DashboardView from './DashboardView';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        ...state,
    };
};

export const Dashboard = connect(mapStateToProps)(DashboardView);