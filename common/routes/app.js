import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { routes } from './routes';
import Main from '../components/main/main';
import Layout from '../components/layout/layout';

export default () => (
    <Switch>
        <Main>
            <Layout>
                {routes.map(route => (
                    <Route key={uniqueId()} {...route} />
                ))}
            </Layout>
        </Main>
    </Switch>
);
