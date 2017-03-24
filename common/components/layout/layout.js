import React from 'react';

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
                123
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
