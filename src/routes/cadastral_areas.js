import query from "../common/database";

export default function (req, res, next) {
    let values = [req.params.code, req.params.date];
    let sql = "SELECT * FROM api_monitor.area_statistics WHERE code = $1 AND valid_at = $2";

    return query(sql, values)
        .then((data) => {
            res.send(data.rows);
            return next();
        }).catch((err) => {
            return next(err);
        });
}
