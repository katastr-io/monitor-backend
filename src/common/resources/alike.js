import query from "../database";

function alike(resource) {
    return function(req, res, next) {
        let values = [req.params.code, req.params.valid_at];
        let sql = `
            SELECT
                code,
                name
            FROM api_monitor.${resource}_statistics
            WHERE code IN (
                SELECT
                    unnest(alike)
                FROM api_monitor.${resource}_statistics
                WHERE code = $1
            )
            AND valid_at = $2`;

        return query(sql, values)
            .then((data) => {
                res.send(data.rows);
                return next();
            }).catch((err) => {
                return next(err);
            });
    }
}

export default alike;
