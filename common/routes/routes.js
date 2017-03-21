import Index from '../path/index/index';
import Counter from '../path/counter/counter';

export const routes = [
    {
        component: Index,
        path: '/',
        exact: true
    },
    {
        component: Counter,
        path: '/counter',
        exact: true
    }
];
