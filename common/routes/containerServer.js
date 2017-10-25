import syncComponent from '../utils/syncComponent';

export const Index = syncComponent('Index', require('../containers/index/index'));
export const Counter = syncComponent('Counter', require('../containers/counter/counter'));
export const NotFound = syncComponent('NotFound', require('../containers/notFound/notFound'));
