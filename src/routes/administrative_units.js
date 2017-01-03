export default function (req, res, next) {
    res.send([
        {
            "name": "area",
            "repr": "katastrální území"
        },
        {
            "name": "municipality",
            "repr": "obec"
        },
        {
            "name": "county",
            "repr": "okres"
        },
        {
            "name": "region",
            "repr": "kraj"
        }
    ]);
    return next();
}
