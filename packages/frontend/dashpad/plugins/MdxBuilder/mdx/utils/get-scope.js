import transpile from '@mdx-js/mdx';

import remarkUnImporter from './remark-un-importer';
import resolveScopeInfo from './resolve-scope-info';
import resolveScope from './resolve-scope';

export default ({
    remarkPlugins = [],
    rehypePlugins = [],
    mdx,
    allowedImports,
    resolvePath,
    packageInfo
}) => {
    let scope = {};
    transpile.sync(mdx, {
        remarkPlugins: [
            ...remarkPlugins,
            [
                remarkUnImporter,
                {
                    reporter: value => {
                        scope = resolveScope(
                            allowedImports,
                            resolveScopeInfo(value),
                            resolvePath,
                            packageInfo
                        );
                    },
                },
            ],
        ],
        rehypePlugins,
        skipExport: true,
    });

    return scope;
};