import React from 'react';

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

export default Index;
// export default connect(mapStateToProps, mapDispatchToProps)(Index);
