const babel = require('@babel/core');
const React = require('react');
const path = require('path');
const { renderToString } = require('react-dom/server');
const mdx = require('@mdx-js/mdx');
const { MDXProvider, mdx: createElement } = require('@mdx-js/react');
const fse = require('fs-extra');

const transform = (code, cwd) =>
    babel.transform(code, {
        cwd,
        presets: [
            [
                require.resolve('@dashpad/babel-preset'),
                {
                    env: { targets: { node: 8 } },
                    transformRuntime: false,
                },
            ],
        ],
    }).code;

const renderWithReact = (fileName) => {
    const mdxCode = fse.readFileSync(path.resolve(fileName), 'utf8');
    const cwd = path.resolve(fileName.substring(0, fileName.lastIndexOf('/')));
    const jsx = mdx.sync(mdxCode, { skipExport: true });
    // const requireUtil = module.createRequireFromPath(cwd);
    const code = transform(jsx, cwd);
    const scope = { mdx: createElement, cwd };
    console.log(code);
    const fn = new Function(
        'React',
        'exports',
        'require',
        'module',
        '__filename',
        '__dirname',
        ...Object.keys(scope),
        `${code}; return React.createElement(MDXContent)`
    );

    const element = fn(
        React,
        exports,
        require,
        module,
        fileName,
        cwd,
        ...Object.values(scope)
    );
    const components = {
        h1: ({ children }) =>
            React.createElement('h1', { style: { color: 'tomato' } }, children),
    };
    const elementWithProvider = React.createElement(
        MDXProvider,
        [components],
        [element]
    );
    return renderToString(elementWithProvider);
};

module.exports = renderWithReact;
