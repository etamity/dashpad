import DefaultAside from './DefaultAside';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        ...state,
    };
};

export default connect(mapStateToProps)(DefaultAside)