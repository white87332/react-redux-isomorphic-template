import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isNode from 'detect-node';
import * as CounterActions from '../../actions/counter';

if (!isNode)
{
    require('./counter.scss');
}

function mapStateToProps(state)
{
    return {
        numbers: state.counter.numbers
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators(CounterActions, dispatch);
}

class Counter extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    render()
    {
        const { increment, decrement, numbers } = this.props;
        return (
            <div className="counter">
                Clicked: {numbers} times
                {' '}
                <button onClick={increment}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
            </div>
        );
    }
}

Counter.propTypes = {
    increment: React.PropTypes.func.isRequired,
    decrement: React.PropTypes.func.isRequired,
    numbers: React.PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
