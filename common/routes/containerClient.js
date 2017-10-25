import asyncComponent from '../utils/asyncComponent';

export const Index = asyncComponent('Index', () => import('../containers/index/index'));
export const Counter = asyncComponent('Counter', () => import('../containers/counter/counter'));
export const NotFound = asyncComponent('NotFound', () => import('../containers/notFound/notFound'));
