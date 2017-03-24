import React from 'react';
import { Link } from 'react-router-dom';

class Layout extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    render()
    {
        return (
            <div className="layout">
                <Link to="/">index</Link>&nbsp;&nbsp;
                <Link to="/counter">counter</Link>
                {this.props.children}
            </div>
        );
    }
}

Layout.defaultProps = {
    children: {}
};

Layout.propTypes = {
    children: React.PropTypes.array.isRequired
};

export default Layout;
