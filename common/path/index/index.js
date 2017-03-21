import React from 'react';
import { connect } from 'react-redux';
// import { translate } from 'react-i18next';
import isNode from 'detect-node';

if (!isNode)
{
    require('./index.scss');
}

// @translate(['common'], { wait: true })
class Index extends React.Component
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
            <div className="p_index">
                index
            </div>
        );
    }
}

export default connect()(Index);
