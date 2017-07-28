import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

@translate(['common'], { wait: true })
class NotFound extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()
    {
        return (
            <div className="p_notFound" >
                NotFound
            </div>
        );
    }
}

export default connect()(NotFound);
