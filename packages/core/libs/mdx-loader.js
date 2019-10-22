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
                    transformRuntime: {
                        absoluteRuntime: false,
                        corejs: false,
                        helpers: true,
                        regenerator: true,
                        useESModules: false,
                    },
                },
            ],
        ],
    }).code;

const renderWithReact = fileName => {
    const mdxCode = fse.readFileSync(path.resolve(fileName), 'utf8');
    const dirname = path.resolve(
        fileName.substring(0, fileName.lastIndexOf('/'))
    );
    const jsx = mdx.sync(mdxCode, { skipExport: false });
    // const requireUtil = module.createRequireFromPath(cwd);
    const code = transform(jsx, dirname);
    const scope = {
        React,
        mdx: createElement,
        exports,
        module,
        __filename,
        __dirname,
        require,
    };
    const finalCode = `
    require('@dashpad/babel-preset/babel-transpile');
    ${code}; 
    return React.createElement(MDXContent)`;
    // eslint-disable-next-line no-new-func
    const fn = new Function(
        ...Object.keys(scope),
        finalCode
    );

    const element = fn(
        ...Object.values(scope)
    );
    // console.log(element);
    const elementWithProvider = React.createElement(
        MDXProvider,
        {},
        element
    );
    return renderToString(elementWithProvider);
};

module.exports = renderWithReact;
