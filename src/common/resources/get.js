import query from "../database";

function get(resource) {
    return function(req, res, next) {
        let values = [req.params.code, req.params.valid_at];
        let sql = `
            SELECT
                code,
                name,
                valid_at,
                total_count,
                total_area,
                arable_land_count,
                arable_land_area,
                hop_garden_count,
                hop_garden_area,
                vineyard_count,
                vineyard_area,
                garden_count,
                garden_area,
                orchard_count,
                orchard_area,
                grassland_count,
                grassland_area,
                forest_count,
                forest_area,
                waterbody_count,
                waterbody_area,
                builtup_area_count,
                builtup_area_area,
                other_area_count,
                other_area_area,
                arable_land_count_ratio,
                hop_garden_count_ratio,
                vineyard_count_ratio,
                garden_count_ratio,
                orchard_count_ratio,
                grassland_count_ratio,
                forest_count_ratio,
                waterbody_count_ratio,
                builtup_area_count_ratio,
                other_area_count_ratio,
                arable_land_area_ratio,
                hop_garden_area_ratio,
                vineyard_area_ratio,
                garden_area_ratio,
                orchard_area_ratio,
                grassland_area_ratio,
                forest_area_ratio,
                waterbody_area_ratio,
                builtup_area_area_ratio,
                other_area_area_ratio,
                arable_land_area_average,
                hop_garden_area_average,
                vineyard_area_average,
                garden_area_average,
                orchard_area_average,
                grassland_area_average,
                forest_area_average,
                waterbody_area_average,
                builtup_area_area_average,
                other_area_area_average
            FROM api_monitor.${resource}_statistics
            WHERE code = $1
                AND valid_at = $2`;

        return query(sql, values)
            .then((data) => {
                res.send(data.rows[0]);
                return next();
            }).catch((err) => {
                return next(err);
            });
    }
}

export default get;