import React from 'react';

class Counter extends React.Component
{
    static locales = [];

    static needs = [];

    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()
    {
        return (
            <div className="p_counter">
                counter
            </div>
        );
    }
}

export default Counter;
