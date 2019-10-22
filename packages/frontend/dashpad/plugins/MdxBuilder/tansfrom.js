import React from 'react';
import { transform } from 'buble-jsx-only';
import mdx from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';

export default ({
    scope = {},
    components = {},
    remarkPlugins = [],
    rehypePlugins = [],
    children,
    ...props
}) => {
    const fullScope = {
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
        transforms: {
            arrow: true,
            modules: true,
            dangerousForOf: true,
        },
        objectAssign: 'Object.assign',
        jsx: 'React.createElement',
    });
    console.log(code);
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);
    // eslint-disable-next-line no-new-func
    const fn = new Function(
        '_fn',
        'React',
        ...keys,
        `${code}

    return React.createElement(MDXProvider, { components },
      React.createElement(MDXContent, props)
    );`
    );

    return fn({}, React, ...values);
};
