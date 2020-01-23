import React from 'react';
import { transform } from '@babel/standalone';
import { Remote } from 'common/libs/Remote';
import path from 'path';
import VM from 'common/libs/VM';

const { ContentHelper } = Remote();

const relativePath = basePath => filePath =>
    'file:///' + path.resolve(basePath, filePath);

const compile = (jsx, scopes, opts) => {
    const { packageInfo, modulePath ,returnCode } = opts;
    const filename = path.basename(modulePath);
    const basePath = path.dirname(modulePath);
    try {
        const fullScope = {
            ...scopes,
            React,
            exports: {},
        };
        let finalCode = null;
        const { code } = transform(jsx, {
            ...{ filename },
            moduleRoot: basePath,
            presets: ['es2015', 'react', 'flow']
        });
        finalCode = returnCode
            ? [code, returnCode]
            : [code, 'return exports;'];
        finalCode = finalCode.join('\n').trim();
        fullScope.require = requireLib(basePath, scopes, packageInfo);
        return VM.eval(finalCode, fullScope);
    } catch (error) {
        throw new Error(error);
    }
};

const requireLib = (basePath, scopes, packageInfo) => filename => {
    const ext = path.extname(filename);
    const modulePath = path.resolve(basePath, filename);
    switch (ext) {
        case '.mdx': 
        case '.jsx':
        case '.js':
            return compile(ContentHelper.loadFile(modulePath), scopes, {
                packageInfo,
                modulePath,
            });
        case '.json':
            return JSON.parse(ContentHelper.loadFile(modulePath));
        case '.png':
        case '.jpg':
        case '.jpeg':
        case '.svg':
        case '.gif':
            return relativePath(basePath)(filename);
        case '.css':
            const cssPath = path.resolve(basePath, filename);
            const css = ContentHelper.loadFile(cssPath);
            return <style>{css}</style>;
        default:
            if (filename.charAt(0) !== '.') {
                let Exports = scopes[filename];
                if (!Exports) {
                    const {
                        packagePath
                    } = packageInfo;
                    const searchPaths = [
                        basePath,
                        packagePath,
                        path.resolve(packagePath,'_dash'),
                        path.resolve(packagePath,'node_modules')
                    ];
                    global.require.main.paths = [
                        ...searchPaths
                    ];
                    Exports = global.require(filename);
                    if (!Exports) {
                        throw new Error(`can't find module '${filename}'!`);
                    }
                    return Exports;
                }
                if (Exports.ImportDefault) {
                    return Exports.ImportDefault;
                }
                if (Exports.Import) {
                    return Exports.Import;
                }
            }
    }
};

export default {
    compile,
    requireLib,
};
