import React from 'react';
import { transform } from '@babel/standalone';
import { Remote } from 'common/libs/Remote';
import path from 'path';
import VM from 'common/libs/VM';

const { ContentHelper } = Remote();
const compile = (basePath, modulePath, scopes) => {
    const filename = modulePath.substring(
        modulePath.lastIndexOf('/') + 1,
        modulePath.length - 1
    );
    const jsx = ContentHelper.loadFile(path.resolve(basePath, modulePath));
    try {
        const { code } = transform(jsx, {
            moduleRoot: process.cwd(),
            filename,
            presets: ['es2015', 'react', 'flow'],
        });
        const finalCode = `${code}\nreturn exports;`;

        return VM.eval(finalCode, {
            ...scopes,
            React,
            require: requireLib(basePath, scopes),
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
    return compile(basePath, filename);
};

export default {
    compile,
};
