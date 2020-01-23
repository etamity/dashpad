import LoginViewPage from './LoginView';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isLogined : state.app.system.isLogined,
    };
};

export const LoginView = connect(mapStateToProps)(LoginViewPage);
