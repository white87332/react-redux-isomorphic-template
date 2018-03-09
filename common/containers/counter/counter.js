import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import * as CounterActions from '../../actions/counter';
import { Container } from '../../widgets/container';
import { Button } from '../../widgets/button';

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

@translate([], { wait: isNode ? false : true })
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
            <Container>
                Clicked: {numbers} times
                {' '}
                <Button onClick={increment}>+</Button>
                {' '}
                <Button onClick={decrement}>-</Button>
            </Container>
        );
    }
}

Counter.propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    numbers: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
