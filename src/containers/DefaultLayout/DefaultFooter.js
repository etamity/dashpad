import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { shell } from 'electron';
const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
    render() {
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <span>
                </span>
                <span className="ml-auto">
                <Button color="link" onClick={()=>{
                        shell.openExternal('https://github.com/etamity/dashpad');
                    }}> <a href="https://github.com/etamity/dashpad" target="_blank"><i className="fa fa-github fa-lg" /> Dashpad &copy; 2019</a></Button>

                </span>
            </React.Fragment>
        );
    }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
