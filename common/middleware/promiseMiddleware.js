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

        const [REQUEST, SUCCESS, ERROR] = types;

        next({ ...rest, type: REQUEST });

        return promise
            .then((data) =>
            {
                next({ ...rest, data: data.data, type: SUCCESS });
            })
            .catch((error) =>
            {
                next({ ...rest, error, type: ERROR });
            });
    };
}
