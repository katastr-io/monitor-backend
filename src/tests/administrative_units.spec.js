import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import request from "supertest";
import server from "../server";
import getAdministrativeUnits from "../routes/administrative_units";

const app = server.listen();
const should = chai.should();

describe("/administrative_units", function() {
    describe("GET all administrative units", function() { // otherwise this.timeout() won't work
        it("should return administrative units array", (done) => {
            request(app)
                .get("/administrative_units")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.an("array");
                    res.body[1].should.have.a.property("name");
                    res.body[1].should.have.a.property("repr");
                    done();
                });
        });
    });
});
