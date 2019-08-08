import SchemaBuilderView from './SchemaBuilder';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        uiSchema: state.app.uiSchema,
    };
};

export const SchemaBuilder = connect(mapStateToProps)(SchemaBuilderView);
