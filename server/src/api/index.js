export default
{
    init()
    {
        return {
            initExec: false,
            routes: [
                { method: 'get', url: '/api' },
            ],
        };
    },

    exec(req, res)
    {
        res.json({
            result: 1,
            message: 'dat get',
            data: [
                { a: 1, b: 2 },
                { a: 2, b: 3 }
            ]
        });
    }
};
