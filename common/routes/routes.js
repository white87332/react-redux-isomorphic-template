// import asyncComponent from '../utils/asyncComponent';
// import { postsList } from '../actions/post';

import { Index } from './server';

if (undefined === System.import)
{
    System.import = (path) =>
    {
        return Promise.resolve(require(path));
    };
}

export const routes = [
    {
        component: Index,
        path: '/',
        exact: true,
        loadData: () => Promise.all([
            // dispatch(postsList(params))
        ]),
        locales: [
            'common',
            'counter'
        ]
    },
    // {
    //     component: asyncComponent(() => System.import('../containers/counter/counter').then(module => module.default)),
    //     path: '/counter',
    //     exact: true,
    //     locales: ['common']
    // },
    // {
    //     component: asyncComponent(() => System.import('../containers/notFound/notFound').then(module => module.default)),
    //     path: '/notFound',
    //     exact: true,
    //     locales: ['common']
    // }
];
