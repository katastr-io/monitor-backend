import query from "../database";

function geometry(resource) {
    return function(req, res, next) {
        let values = [req.params.code];
        let sql = `
            SELECT
                ST_AsGeoJSON(ST_Transform(geom, 4326)) geom
            FROM src_ruian.${resource}
            WHERE code = $1`;

        return query(sql, values)
            .then((data) => {
                res.send(data.rows[0]);
                return next();
            }).catch((err) => {
                return next(err);
            });
    }
}

export default geometry;
