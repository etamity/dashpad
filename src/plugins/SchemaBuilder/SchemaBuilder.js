import React, { Component } from 'react';
import { YMLBuilder } from 'builder/YMLBuilder';

export default class SchemaBuilder extends Component {
    static Config() {
        return {
            name: 'UIBuilder',
        };
    }
    render() {
        return <YMLBuilder schema={this.props.uiSchema} />;
    }
}
