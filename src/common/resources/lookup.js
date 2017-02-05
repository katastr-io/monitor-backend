import query from "../database";

function lookup(resource) {
    return function(req, res, next) {
        let values = [`${req.body.query}%`, req.body.valid_at];
        let sql = `
            SELECT
                code,
                name
            FROM api_monitor.${resource}_statistics
            WHERE (name LIKE $1 OR code::text LIKE $1)
                AND valid_at = $2;`

        return query(sql, values)
            .then((data) => {
                res.send(data.rows);
                return next();
            }).catch((err) => {
                return next(err);
            });
    }
}

export default lookup;
