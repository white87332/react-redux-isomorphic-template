import { Index, Counter, NotFound } from './containerServer';
import { postReq } from '../actions/post';

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
        loadData: (dispatch, params) => Promise.all([
            dispatch(postReq(params))
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
