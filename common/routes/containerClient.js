import asyncComponent from '../utils/asyncComponent';

export const Index = asyncComponent('index', import('../containers/index/index'));
export const Counter = asyncComponent('counter', import('../containers/counter/counter'));
export const NotFound = asyncComponent('notFound', import('../containers/notFound/notFound'));
