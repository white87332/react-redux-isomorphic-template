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
        ])
    },
    {
        component: Counter,
        path: '/counter',
        exact: true
    },
    {
        component: NotFound,
        path: '/notFound',
        exact: true
    }
];
