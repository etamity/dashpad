import JsxBuilderView from './JsxBuilderView';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        uiSchema: state.app.uiSchema,
        packageInfo: state.app.packageInfo
    };
};

export const JsxBuilder = connect(mapStateToProps)(JsxBuilderView);
