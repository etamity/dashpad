import React from 'react';
import { PropsFilter } from './utils';
import { YMLBase } from './YMLBase';
import VM from 'common/libs/VM';

const allowedProps = [
    'src',
    'preload',
    'httpreferrer',
    'useragent',
    'nodeintegration',
    'disablewebsecurity',
    'plugin',
    'partition',
    'allowpopups',
    'webpreferences',
    'enableblinkfeatures',
    'disableblinkfeatures',
    'data-',
];

export class YMLWebview extends YMLBase {
    constructor(props) {
        super(props);
    }

    render() {
        const { keyPath } = this.props;
        return (
            <webview
                key={keyPath}
                {...PropsFilter(this.props, allowedProps)}
                style={{
                    minHeight: '100vh',
                }}
                ref={ref => {
                    VM.addRef(keyPath, ref);
                }}
            />
        );
    }
}
