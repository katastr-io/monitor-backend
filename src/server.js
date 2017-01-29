import restify from  "restify";
import config from "./config";
import getDates from "./routes/dates";
import getAdministrativeUnits from "./routes/administrative_units";
import * as resources from "./common/resources/resources.js";

const AREA = "area";
const COUNTY = "county";
const MUNICIPALITY = "municipality";
const REGION = "region";

const server = restify.createServer();
server.use(restify.bodyParser());

server.get("/dates/", getDates);
server.get("/administrative_units", getAdministrativeUnits);

/* cadastral_areas */
server.get("/cadastral_areas/:code/:valid_at", resources.get(AREA));
server.post("/cadastral_areas/lookup", resources.lookup(AREA));
server.get("/cadastral_areas/:code/:valid_at/alike", resources.alike(AREA));
server.post("/cadastral_areas/:code/progress", resources.progress(AREA));

/* municipalities */
server.get("/municipalities/:code/:valid_at", resources.get(MUNICIPALITY));
server.post("/municipalities/lookup", resources.lookup(MUNICIPALITY));
server.get("/municipalities/:code/:valid_at/alike", resources.alike(MUNICIPALITY));
server.post("/municipalities/:code/progress", resources.progress(MUNICIPALITY));

/* counties */
server.get("/counties/:code/:valid_at", resources.get(COUNTY));
server.post("/counties/lookup", resources.lookup(COUNTY));
server.get("/counties/:code/:valid_at/alike", resources.alike(COUNTY));
server.post("/counties/:code/progress", resources.progress(COUNTY));

/* regions */
server.get("/regions/:code/:valid_at", resources.get(REGION));
server.post("/regions/lookup", resources.lookup(REGION));
server.get("/regions/:code/:valid_at/alike", resources.alike(REGION));
server.post("/regions/:code/progress", resources.progress(REGION));

server.listen(config.server.port, function() {
    console.log(`listening on port ${config.server.port}`);
});

export default server;
