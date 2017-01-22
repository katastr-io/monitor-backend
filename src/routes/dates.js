import query from "../common/database";

export default function (req, res, next) {
    return query("SELECT DISTINCT valid_at::text FROM api_monitor.region_statistics ORDER BY valid_at")
        .then((data) => {
            res.send(data.rows);
            return next();
        }).catch((err) => {
            return next(err);
        });
}
