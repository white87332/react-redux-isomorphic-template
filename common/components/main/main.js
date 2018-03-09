import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
            <div className="grid">
                <div className="menu">
                    <div className="item">
                        <Link href="/" to="/">index</Link>
                    </div>
                    <div className="item">
                        <Link href="/counter" to="/counter">
                            counter
                        </Link>
                    </div>
                </div>
                <div className="children">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.object.isRequired
};

export default Main;
