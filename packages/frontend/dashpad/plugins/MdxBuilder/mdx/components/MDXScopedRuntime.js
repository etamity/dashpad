import React from 'react';
import PropTypes from 'prop-types';

import remarkUnImporter from '../utils/remark-un-importer';
import getScope from '../utils/get-scope';
import MDX from './MDX';

function ErrorRenderer({ children }) {
    return (
        <pre
            className="mdx-scoped-runtime__error"
            style={{ overflowX: 'auto', background: 'rgba(255, 0, 0, .1)' }}
        >
            {`Invalid MDX:\n${children.toString()}`}
        </pre>
    );
}

ErrorRenderer.propTypes = {
    children: PropTypes.shape({
        toString: PropTypes.func.isRequired,
    }).isRequired,
};

class MDXScopedRuntime extends React.Component {
    state = { error: undefined };

    componentDidUpdate(prevProps) {
        const { error } = this.state;
        const { children } = this.props;
        if (error && children !== prevProps.children) {
            this.setState({ error: undefined }); // eslint-disable-line react/no-did-update-set-state
        }
    }

    onError = error => {
        const { onError } = this.props;
        this.setState({ error });
        onError(error);
    };

    componentDidCatch(error) {
        this.onError(error);
    }

    render() {
        const { error } = this.state;
        const {
            scope,
            remarkPlugins,
            allowedImports,
            rehypePlugins,
            components,
            children,
        } = this.props;

        if (error) {
            return <ErrorRenderer>{error}</ErrorRenderer>;
        }

        try {
            const resolvedScope = allowedImports
                ? getScope({
                      remarkPlugins,
                      rehypePlugins,
                      mdx: children,
                      allowedImports,
                  })
                : {};
            return (
                <MDX
                    components={{ ...components, ...resolvedScope }}
                    scope={{
                        Layout: ({ children }) => children,
                        ...scope,
                    }}
                    remarkPlugins={[[remarkUnImporter], ...remarkPlugins]}
                >
                    {children}
                </MDX>
            );
        } catch (err) {
            this.onError(err);
            return <ErrorRenderer>{err}</ErrorRenderer>;
        }
    }
}

MDXScopedRuntime.propTypes = {
    scope: PropTypes.shape({}).isRequired,
    components: PropTypes.shape({}).isRequired,
    remarkPlugins: PropTypes.arrayOf(PropTypes.any).isRequired,
    rehypePlugins: PropTypes.arrayOf(PropTypes.any).isRequired,
    allowedImports: PropTypes.shape({}),
    onError: PropTypes.func.isRequired,
    children: PropTypes.node,
};

MDXScopedRuntime.defaultProps = {
    scope: {},
    remarkPlugins: [],
    rehypePlugins: [],
    onError: () => undefined,
};

export default MDXScopedRuntime;
