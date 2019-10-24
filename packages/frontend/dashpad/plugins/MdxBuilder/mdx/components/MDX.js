// Direct copy-paste from https://github.com/mdx-js/mdx/releases/tag/v0.20.4
// + fix for object spreading
import React from 'react';
import { transform } from 'buble';
import mdx from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';
import ErrorRenderer from './Error';
import VM from 'common/libs/VM';

export default ({
    scope = {},
    components = {},
    remarkPlugins = [],
    rehypePlugins = [],
    children,
    onError,
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

    const jsx = mdx
        .sync(children, {
            remarkPlugins,
            rehypePlugins,
            skipExport: true,
        })
        .trim();

    const { code } = transform(jsx, {
        objectAssign: 'Object.assign',
    });
    // eslint-disable-next-line no-new-func
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);


    const finalCode = `${code}\nreturn React.createElement(MDXProvider, { components }, 
React.createElement(MDXContent, props));`.trim();
    
    try {
        const fn = new Function(
            ...keys,
            finalCode
        );
    
        return VM.run(finalCode,null, fullScope);
    } catch (err) {
        onError(err);
        return <ErrorRenderer>{err}</ErrorRenderer>;
    }
};
