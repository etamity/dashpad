import React, { Component } from 'react';
import { YMLBuilder } from 'common/builder/YMLBuilder';

export default class SchemaBuilder extends Component {
    static Config() {
        return {
            name: 'UIBuilder',
        };
    }
    render() {
        return (
            <YMLBuilder
                schema={this.props.uiSchema}
                script={this.props.script}
            />
        );
    }
}
