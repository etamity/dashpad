import React, { Component } from 'react';
export class YMLHtmlView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <div
                key={keyPath}
                dangerouslySetInnerHTML={{__html: obj.content}}
                />
        );
    }
}
