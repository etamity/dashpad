const babel = require('@babel/core');
const mdx = require('@mdx-js/mdx');
const fse = require('fs-extra');
const path = require('path');
const DEFAULT_RENDERER = `
`;
const transform = (code, cwd) =>
    babel.transform(code, {
        cwd: cwd || process.cwd(),
        presets: [
            [
                require.resolve('@dashpad/babel-preset'),
                {
                    env: { targets: '> 0.25%, not dead' },
                    transformRuntime: {
                        absoluteRuntime: true,
                        corejs: 2,
                        helpers: true,
                        regenerator: true,
                        useESModules: true,
                    },
                },
            ],
        ],
    }).code;

const loader = function(fileName) {
    const content = fse.readFileSync(path.resolve(fileName), 'utf8');
    const options = Object.assign(
        {},
        {
            filepath: fileName,
            skipExport: true,
        }
    );

    let result;

    try {
        result = mdx.sync(content, options);
    } catch (err) {
        console.error(err);
    }

    const { renderer = DEFAULT_RENDERER } = options;

    const code = transform(`${renderer}\n${result}\n`);
    const finalCode = `${code}
return React.createElement(MDXProvider, { components },
React.createElement(MDXContent));`.trim();

    return finalCode;
};

module.exports = loader;
