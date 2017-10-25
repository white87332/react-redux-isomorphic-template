import { Index, Counter, NotFound } from './containerServer';

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
    {
        component: Counter,
        path: '/counter',
        exact: true,
        locales: ['common']
    },
    {
        component: NotFound,
        path: '/notFound',
        exact: true,
        locales: ['common']
    }
];
