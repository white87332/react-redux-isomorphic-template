import asyncComponent from '../utils/asyncComponent';

export const Index = asyncComponent('index', () => import('../containers/index/index'));
