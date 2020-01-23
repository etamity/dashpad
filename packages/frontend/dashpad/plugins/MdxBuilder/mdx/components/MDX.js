// Direct copy-paste from https://github.com/mdx-js/mdx/releases/tag/v0.20.4
// + fix for object spreading
import React from 'react';
import mdx from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';
import ErrorRenderer from 'common/components/Error';
import ModuleComplier from 'common/libs/ModuleComplier';

export default ({
    scope = {},
    components = {},
    remarkPlugins = [],
    rehypePlugins = [],
    children,
    onError,
    packageInfo,
    ...props
}) => {
    const fullScope = {
        _fn: {},
        React,
        mdx: createElement,
        MDXProvider,
        components,
        props,
        ...scope,
    };
    const { filePath } = packageInfo;
    try {
        const jsx = mdx
            .sync(children, {
                remarkPlugins,
                rehypePlugins,
                skipExport: true,
            })
            .trim();

        const returnCode = `return React.createElement(MDXProvider, { components }, 
            React.createElement(MDXContent, props));`;

        return ModuleComplier.compile(jsx, fullScope, { modulePath: filePath, packageInfo, returnCode });
    } catch (err) {
        onError(err);
        return <ErrorRenderer>{err}</ErrorRenderer>;
    }
};
