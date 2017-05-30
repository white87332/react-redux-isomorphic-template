import React from 'react';
import isNode from 'detect-node';
import { parse } from 'qs';
import update from 'immutability-helper';

if (!isNode)
{
    require('./main.scss');
}

class Main extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    render()
    {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_reactInternalInstance", "_context"] }] */
        let { location } = this._reactInternalInstance._context.router.history;
        location = Object.assign({}, location, {
            query: parse(location.search.replace('?', ''))
        });

        const props = update(this.props, {
            location: { $set: location }
        });

        return (
            <div>
                {props.children}
            </div>
        );
    }
}

export default Main;
