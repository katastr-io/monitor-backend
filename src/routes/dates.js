import query from "../common/database";

export default function (req, res, next) {
    return query(`
	SELECT DISTINCT 
		valid_at::text valid_at, 
		replace(trim(leading '0' from to_char(valid_at, 'DD. MM. YYYY')), '. 0', '. ') repr 
	FROM api_monitor.region_statistics 
	ORDER BY valid_at`)
        .then((data) => {
            res.send(data.rows);
            return next();
        }).catch((err) => {
            return next(err);
        });
}
