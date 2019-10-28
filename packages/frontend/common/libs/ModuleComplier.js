import React from 'react';
import { transform } from '@babel/standalone';
import { Remote } from 'common/libs/Remote';
import path from 'path';
import VM from 'common/libs/VM';

const { ContentHelper } = Remote();

const relativePath = basePath => filePath =>
    'file:///' + path.resolve(basePath, filePath);

const compile = (jsx, scopes, opts) => {
    const { modulePath, returnCode } = opts;
    const filename = path.basename(modulePath);
    const basePath = path.dirname(modulePath);
    const isJsx = path.extname(filename) === '.jsx';
    try {
        const { code } = transform(jsx, {
            ...{ filename },
            moduleRoot: basePath,
            presets: ['es2015', 'react', 'flow'],
        });
        const finalCode = returnCode
            ? [code, returnCode]
            : [code, 'return exports;'];
        const fullScope = {
            ...scopes,
            resource: relativePath(basePath),
            React,
            exports: {},
        };
        if (isJsx) {
            fullScope.require = requireLib(basePath, scopes);
        }
        console.log('basefullScopePath', fullScope);
        return VM.eval(finalCode.join('\n').trim(), fullScope);
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
    const ext = path.extname(filename);
    const modulePath = path.resolve(basePath, filename);
    if (!(ext && ContentHelper.isExist(modulePath))) {
        throw new Error(`Unknow file: ${modulePath}`);
    }
    switch (ext) {
        case '.jsx':
        case '.js':
            return compile(ContentHelper.loadFile(modulePath), scopes, { modulePath });
        case '.json':
            return JSON.parse(ContentHelper.loadFile(modulePath));
        case '.png':
        case '.jpg':  
        case '.jpeg': 
        case '.svg': 
        case '.gif': 
            return relativePath(basePath)(filename);
        default:
            return compile(ContentHelper.loadFile(modulePath), scopes, { modulePath });
    }
};

export default {
    compile,
    requireLib,
};
