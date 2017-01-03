import restify from  "restify";
import query from "./common/database";
import getDates from "./routes/dates";
import getAdministrativeUnits from "./routes/administrative_units";
import getCadastralAreas from "./routes/cadastral_areas";

const server = restify.createServer();

server.get("/dates/", getDates);
server.get("/administrative_units", getAdministrativeUnits);
server.get("/cadastral_areas/:code/:date", getCadastralAreas);

server.listen(8080, function() {
    console.log("listening");
});

