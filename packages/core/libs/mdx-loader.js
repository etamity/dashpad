const babel = require('@babel/core');
const React = require('react');
const path = require('path');
const { renderToString } = require('react-dom/server');
const mdx = require('@mdx-js/mdx');
const { MDXProvider, mdx: createElement } = require('@mdx-js/react');
const fse = require('fs-extra');

const transform = (code, cwd) =>
    babel.transform(code, {
        cwd: cwd || process.cwd(),
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
    const code = transform(jsx, dirname);
    const scope = {
        React,
        react: React,
        MDXProvider,
        mdx: createElement,
        exports,
        module,
        __filename: fileName,
        __dirname: dirname,
        require,
        components: {},
        props: {}
    };
    const finalCode = `
    ${code}; 
    return React.createElement(MDXProvider, { components },
        React.createElement(MDXContent, props)
      );`;

      console.log(finalCode);
    // eslint-disable-next-line no-new-func
    const fn = new Function(
        ...Object.keys(scope),
        finalCode
    );

    const Element = fn(
        ...Object.values(scope)
    );
    return renderToString(Element);
};

module.exports = renderWithReact;
