import pg from "pg";
import config from "../config.js";

const pool = new pg.Pool(config.database);

pool.on("error", (err, client) => {
    console.error(err);
});

export default function query(text, values) {
    return pool.query(text, values);
};