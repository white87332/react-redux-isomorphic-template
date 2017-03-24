import asyncComponent from '../utils/asyncComponent';

if (undefined === global.System.import)
{
    global.System.import = (path) =>
    {
        return Promise.resolve(require(path));
    };
}

export const routes = [
    {
        component: asyncComponent(() => System.import('../path/index/index').then(module => module.default)),
        path: '/',
        exact: true
    },
    {
        component: asyncComponent(() => System.import('../path/counter/counter').then(module => module.default)),
        path: '/counter',
        exact: true
    }
];
