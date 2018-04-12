import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { parse } from 'qs';

export default function asyncComponent(chunkName, getComponent)
{
    return class AsyncComponent extends React.Component
    {
        static propTypes = {
            location: PropTypes.object.isRequired
        }

        static Component = null;

        static async loadComponent()
        {
            const m = await getComponent();
            AsyncComponent.Component = m.default;
            return m.default;
        }

        constructor(props, context)
        {
            super(props, context);
            this.mounted = false;
            this.state = {
                Component: AsyncComponent.Component
            };
        }

        async componentDidMount()
        {
            if (!this.state.Component)
            {
                const m = await getComponent();
                AsyncComponent.Component = m.default;
                if (!this.mounted)
                {
                    this.setComponent(m.default);
                }
            }
        }

        componentWillUnmount()
        {
            this.mounted = false;
        }

        setComponent(Component)
        {
            this.setState({
                Component
            }, () => {
                this.mounted = true;
            });
        }

        render()
        {
            const props = update(this.props, {
                location: {
                    query: { $set: parse(this.props.location.search.replace('?', '')) }
                }
            });

            const { Component } = this.state;
            if (Component)
            {
                return <Component {...props} />;
            }
            else
            {
                return null;
            }
        }
    };
}
