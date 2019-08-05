import DefaultAside from './DefaultAside';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        processes: state.app.processes,
    };
};

export default connect(mapStateToProps)(DefaultAside)