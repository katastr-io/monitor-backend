import restify from  "restify";
import config from "./config";
import getDates from "./routes/dates";
import getAdministrativeUnits from "./routes/administrative_units";
import * as cadastralAreas from "./routes/cadastral_areas";
import * as municipalities from "./routes/municipalities";
import * as counties from "./routes/counties";
import * as regions from "./routes/regions";

const server = restify.createServer();
server.use(restify.bodyParser());

server.get("/dates/", getDates);
server.get("/administrative_units", getAdministrativeUnits);

/* cadastral_areas */
server.get("/cadastral_areas/:code/:valid_at", cadastralAreas.get);
server.post("/cadastral_areas/lookup", cadastralAreas.lookup);
server.get("/cadastral_areas/:code/:valid_at/alike", cadastralAreas.getAlike);
server.post("/cadastral_areas/:code/progress", cadastralAreas.progress);

/* municipalities */
server.get("/municipalities/:code/:valid_at", municipalities.get);
server.post("/municipalities/lookup", municipalities.lookup);
server.get("/municipalities/:code/:valid_at/alike", municipalities.getAlike);
server.post("/municipalities/:code/progress", municipalities.progress);

/* counties */
server.get("/counties/:code/:valid_at", counties.get);
server.post("/counties/lookup", counties.lookup);
server.get("/counties/:code/:valid_at/alike", counties.getAlike);
server.post("/counties/:code/progress", counties.progress);

/* regions */
server.get("/regions/:code/:valid_at", regions.get);
server.post("/regions/lookup", regions.lookup);
server.get("/regions/:code/:valid_at/alike", regions.getAlike);
server.post("/regions/:code/progress", regions.progress);

server.listen(config.server.port, function() {
    console.log(`listening on port ${config.server.port}`);
});

export default server;
