import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import isNode from 'detect-node';

if (!isNode)
{
    require('./index.scss');
}

@translate(['common'], { wait: process && !process.release })
class Index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    render()
    {
        console.log(this.props.t('content.text'));
        return (
            <section className="co_index">
                index
            </section>
        );
    }
}

export default connect()(Index);
