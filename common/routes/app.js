import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { routes } from './routes';
import Main from '../components/main/main';

export default () => (
    <Switch>
        <Main>
            {routes.map(route => (
                <Route key={uniqueId()} {...route} />
            ))}
        </Main>
    </Switch>
);
