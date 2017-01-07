import query from "../common/database";

export default function (req, res, next) {
    return query("SELECT DISTINCT valid_at FROM api_monitor.region_statistics")
        .then((data) => {
            res.send(data.rows);
            return next();
        }).catch((err) => {
            return next(err);
        });
}
