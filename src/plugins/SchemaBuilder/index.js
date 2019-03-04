import SchemaBuilderView from './SchemaBuilder';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        uischema: state.app.uischema,
    };
};

export const SchemaBuilder = connect(mapStateToProps)(SchemaBuilderView)