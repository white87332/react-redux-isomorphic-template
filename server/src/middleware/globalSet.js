import Logger from '../class/logger';

export default () =>
{
    global.log = new Logger().getLog();
    if (undefined === System.import)
    {
        System.import = (path) =>
        {
            return Promise.resolve(require(path));
        };
    }
};
