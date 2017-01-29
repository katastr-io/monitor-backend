import query from "../database";

function progress(resource) {
    return function (req, res, next) {
    let values = [req.params.code, req.body.start, req.body.end];
    let sql = `
        SELECT
            code,
            name,
            array_agg(total_count ORDER BY valid_at) total_count,
            array_agg(total_area ORDER BY valid_at) total_area,
            array_agg(arable_land_count ORDER BY valid_at) arable_land_count,
            array_agg(arable_land_area ORDER BY valid_at) arable_land_area,
            array_agg(hop_garden_count ORDER BY valid_at) hop_garden_count,
            array_agg(hop_garden_area ORDER BY valid_at) hop_garden_area,
            array_agg(vineyard_count ORDER BY valid_at) vineyard_count,
            array_agg(vineyard_area ORDER BY valid_at) vineyard_area,
            array_agg(garden_count ORDER BY valid_at) garden_count,
            array_agg(garden_area ORDER BY valid_at) garden_area,
            array_agg(orchard_count ORDER BY valid_at) orchard_count,
            array_agg(orchard_area ORDER BY valid_at) orchard_area,
            array_agg(grassland_count ORDER BY valid_at) grassland_count,
            array_agg(grassland_area ORDER BY valid_at) grassland_area,
            array_agg(forest_count ORDER BY valid_at) forest_count,
            array_agg(forest_area ORDER BY valid_at) forest_area,
            array_agg(waterbody_count ORDER BY valid_at) waterbody_count,
            array_agg(waterbody_area ORDER BY valid_at) waterbody_area,
            array_agg(builtup_area_count ORDER BY valid_at) builtup_area_count,
            array_agg(builtup_area_area ORDER BY valid_at) builtup_area_area,
            array_agg(other_area_count ORDER BY valid_at) other_area_count,
            array_agg(other_area_area ORDER BY valid_at) other_area_area,
            array_agg(agriculture_land_count ORDER BY valid_at) agriculture_land_count,
            array_agg(agriculture_land_area ORDER BY valid_at) agriculture_land_area,
            array_agg(agriculture_land_count_ratio ORDER BY valid_at) agriculture_land_count_ratio,
            array_agg(agriculture_land_area_ratio ORDER BY valid_at) agriculture_land_area_ratio,
            array_agg(arable_land_count_ratio ORDER BY valid_at) arable_land_count_ratio,
            array_agg(hop_garden_count_ratio ORDER BY valid_at) hop_garden_count_ratio,
            array_agg(vineyard_count_ratio ORDER BY valid_at) vineyard_count_ratio,
            array_agg(garden_count_ratio ORDER BY valid_at) garden_count_ratio,
            array_agg(orchard_count_ratio ORDER BY valid_at) orchard_count_ratio,
            array_agg(grassland_count_ratio ORDER BY valid_at) grassland_count_ratio,
            array_agg(forest_count_ratio ORDER BY valid_at) forest_count_ratio,
            array_agg(waterbody_count_ratio ORDER BY valid_at) waterbody_count_ratio,
            array_agg(builtup_area_count_ratio ORDER BY valid_at) builtup_area_count_ratio,
            array_agg(other_area_count_ratio ORDER BY valid_at) other_area_count_ratio,
            array_agg(arable_land_area_ratio ORDER BY valid_at) arable_land_area_ratio,
            array_agg(hop_garden_area_ratio ORDER BY valid_at) hop_garden_area_ratio,
            array_agg(vineyard_area_ratio ORDER BY valid_at) vineyard_area_ratio,
            array_agg(garden_area_ratio ORDER BY valid_at) garden_area_ratio,
            array_agg(orchard_area_ratio ORDER BY valid_at) orchard_area_ratio,
            array_agg(grassland_area_ratio ORDER BY valid_at) grassland_area_ratio,
            array_agg(forest_area_ratio ORDER BY valid_at) forest_area_ratio,
            array_agg(waterbody_area_ratio ORDER BY valid_at) waterbody_area_ratio,
            array_agg(builtup_area_area_ratio ORDER BY valid_at) builtup_area_area_ratio,
            array_agg(other_area_area_ratio ORDER BY valid_at) other_area_area_ratio,
            array_agg(arable_land_area_average ORDER BY valid_at) arable_land_area_average,
            array_agg(hop_garden_area_average ORDER BY valid_at) hop_garden_area_average,
            array_agg(vineyard_area_average ORDER BY valid_at) vineyard_area_average,
            array_agg(garden_area_average ORDER BY valid_at) garden_area_average,
            array_agg(orchard_area_average ORDER BY valid_at) orchard_area_average,
            array_agg(grassland_area_average ORDER BY valid_at) grassland_area_average,
            array_agg(forest_area_average ORDER BY valid_at) forest_area_average,
            array_agg(waterbody_area_average ORDER BY valid_at) waterbody_area_average,
            array_agg(builtup_area_area_average ORDER BY valid_at) builtup_area_area_average,
            array_agg(other_area_area_average ORDER BY valid_at) other_area_area_average
        FROM api_monitor.${resource}_statistics
        WHERE code = $1
            AND valid_at BETWEEN $2 AND $3
        GROUP BY
            code,
            name`

    return query(sql, values)
        .then((data) => {
            res.send(data.rows[0]);
            return next();
        }).catch((err) => {
            return next(err);
        });
    }
}

export default progress;
