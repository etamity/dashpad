import React from 'react';
import _ from 'lodash';

export class YMLBase extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(this.props, nextProps);
    }
};
