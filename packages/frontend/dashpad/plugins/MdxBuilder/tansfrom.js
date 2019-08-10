import React from 'react';
import babel from '@babel/core';
import mdx from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';
import { renderToStaticMarkup } from 'react-dom/server';

const transform = code =>
    babel.transform(code, {
        plugins: [
            '@babel/plugin-transform-react-jsx',
            '@babel/plugin-proposal-object-rest-spread',
            'babel-plugin-remove-export-keywords',
        ],
    }).code;

const renderWithReact = async (mdxCode, { components } = {}) => {
    const jsx = await mdx(mdxCode, { skipExport: true });

    const code = transform(jsx);
    const scope = { mdx: createElement };

    const fn = new Function( // eslint-disable-line no-new-func
        'React',
        ...Object.keys(scope),
        `${code}; return React.createElement(MDXContent)`
    );

    const element = fn(React, ...Object.values(scope));

    const elementWithProvider = React.createElement(
        MDXProvider,
        { components },
        element
    );
    return elementWithProvider;
};

export default renderWithReact;
