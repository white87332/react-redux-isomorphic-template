import syncComponent from '../utils/syncComponent';

export const Index = syncComponent('index', require('../containers/index/index'));
export const Counter = syncComponent('counter', require('../containers/counter/counter'));
export const NotFound = syncComponent('notFound', require('../containers/notFound/notFound'));
