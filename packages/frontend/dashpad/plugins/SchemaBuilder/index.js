import SchemaBuilderView from './SchemaBuilder';
import { connect } from 'react-redux';
import _ from 'lodash';
const mapStateToProps = state => {
    const { packageInfo } = state.app;
    const { namespace } = packageInfo || {};
    const uiSchema = _.get(state.app.uiSchema, namespace);
    return {
        uiSchema
    };
};

export const SchemaBuilder = connect(mapStateToProps)(SchemaBuilderView);
