import React from 'react';
import { transform } from '@babel/standalone';
import { Remote } from 'common/libs/Remote';
import path from 'path';
import VM from 'common/libs/VM';

const { ContentHelper } = Remote();

const compile = (jsx, scopes, opts) => {
    const { modulePath, returnCode } = opts;
    const filename = path.basename(modulePath);
    const basePath = path.dirname(modulePath);
    const isJsx = path.extname(filename) === '.jsx';
    try {
        const { code } = transform(jsx, {
            ...{ filename },
            moduleRoot: process.cwd(),
            presets: ['es2015', 'react', 'flow'],
        });
        const finalCode = returnCode
            ? [code, returnCode]
            : [code, 'return exports;'];

        return VM.eval(finalCode.join('\n').trim(), {
            ...scopes,
            React,
            ...(isJsx && { require: requireLib(basePath, scopes) }),
            exports: {},
        });
    } catch (error) {
        throw new Error(error);
    }
};

const requireLib = (basePath, scopes) => filename => {
    if (filename.charAt(0) !== '.') {
        const Exports = scopes[filename];
        if (!Exports) {
            throw new Error(`can't find module '${filename}!'`);
        }
        if (Exports.ImportDefault) {
            return Exports.ImportDefault;
        }
        if (Exports.Import) {
            return Exports.Import;
        }
    }
    const modulePath = path.resolve(basePath, filename);
    const jsx = ContentHelper.loadFile(modulePath);
    return compile(jsx, scopes, { modulePath });
};

export default {
    compile,
    requireLib
};
