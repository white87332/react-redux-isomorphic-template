import asyncComponent from '../utils/asyncComponent';
import { postsList } from '../actions/post';

if (undefined === global.System.import)
{
    global.System.import = (path) =>
    {
        return Promise.resolve(require(path));
    };
}

export const routes = [
    {
        component: asyncComponent(() => System.import('../containers/index/index').then(module => module.default)),
        path: '/',
        exact: true,
        loadData: (dispatch, params) => Promise.all([
            dispatch(postsList(params))
        ])
    },
    {
        component: asyncComponent(() => System.import('../containers/counter/counter').then(module => module.default)),
        path: '/counter',
        exact: true
    },
    {
        component: asyncComponent(() => System.import('../containers/notFound/notFound').then(module => module.default)),
        path: '/notFound',
        exact: true
    }
];
