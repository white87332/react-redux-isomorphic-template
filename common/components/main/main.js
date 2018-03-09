import React from 'react';
import PropTypes from 'prop-types';

class Main extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    render()
    {
        return (
            [
                this.props.children
            ]
        );
    }
}

Main.propTypes = {
    children: PropTypes.object.isRequired
};

export default Main;
