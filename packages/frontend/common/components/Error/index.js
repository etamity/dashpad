import React from 'react';
import PropTypes from 'prop-types';

const ErrorRenderer = ({ children }) =>{
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

export default ErrorRenderer;
