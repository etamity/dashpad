import React from 'react';
import PropTypes from 'prop-types';

const ErrorRenderer = ({ children }) => {
    return (
        <div>
            <h5 className="display-5 mr-4">Error:</h5>
            <h6 className="pt-3">
                <pre
                    className="mdx-scoped-runtime__error"
                    style={{
                        overflowX: 'auto',
                        maxHeight: '350px',
                        background: 'rgba(255, 0, 0, .1)',
                    }}
                >
                    {`Invalid React:\n${children.toString()}`}
                </pre>
            </h6>
        </div>
    );
};

ErrorRenderer.propTypes = {
    children: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default ErrorRenderer;
