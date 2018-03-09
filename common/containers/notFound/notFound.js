import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import isNode from 'detect-node';
import { Container } from '../../widgets/container';

@translate([], { wait: isNode ? false : true })
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
            <Container>
                NotFound
            </Container>
        );
    }
}

export default connect()(NotFound);
