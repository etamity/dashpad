import MdxBuilderView from './MdxBuilderView';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        uiSchema: state.app.uiSchema,
        packageInfo: state.app.packageInfo
    };
};

export const MdxBuilder = connect(mapStateToProps)(MdxBuilderView);
