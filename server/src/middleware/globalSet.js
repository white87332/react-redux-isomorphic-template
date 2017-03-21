import Logger from '../class/logger';

export default () =>
{
    global.log = new Logger().getLog();
    if (undefined === System.import)
    {
        global.System.import = (path) =>
        {
            return Promise.resolve(require(path));
        };
    }
};
