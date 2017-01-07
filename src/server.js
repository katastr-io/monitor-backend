import restify from  "restify";
import config from "./config";
import query from "./common/database";
import getDates from "./routes/dates";
import getAdministrativeUnits from "./routes/administrative_units";
import * as cadastralAreas from "./routes/cadastral_areas";

const server = restify.createServer();
server.use(restify.bodyParser());

server.get("/dates/", getDates);
server.get("/administrative_units", getAdministrativeUnits);

/* cadastral_areas */
server.get("/cadastral_areas/:code/:valid_at", cadastralAreas.get);
server.post("/cadastral_areas/lookup", cadastralAreas.lookup);
server.get("/cadastral_areas/:code/:valid_at/alike", cadastralAreas.getAlike);

server.listen(config.server.port, function() {
    console.log(`listening on port ${config.server.port}`);
});

export default server;
