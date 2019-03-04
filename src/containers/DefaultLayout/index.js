import { DefaultLayout } from './DefaultLayout';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        ...state.app,
    };
};

export default connect(mapStateToProps)(DefaultLayout);
