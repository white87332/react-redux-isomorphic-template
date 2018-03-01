export default function promiseMiddleware()
{
    // next = dispatch
    return next => (action) =>
    {
        const { promise, types, ...rest } = action;

        // if no promise attr, next
        if (!promise)
        {
            return next(action);
        }

        const [REQ, SUC, ERR] = types;

        next({ ...rest, type: REQ });

        return promise
            .then((data) =>
            {
                next({ ...rest, data: data.data, type: SUC });
            })
            .catch((error) =>
            {
                next({ ...rest, error, type: ERR });
            });
    };
}
