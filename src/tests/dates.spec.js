import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import request from "supertest";
import server from "../server";
import getDates from "../routes/dates";

const app = server.listen();
const should = chai.should();

describe("/dates", function() {
    describe("GET all dates", function() { // otherwise this.timeout() won't work
        it("should return dates array", (done) => {
            request(app)
                .get("/dates")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.an("array");
                    res.body[0].should.have.a.property("valid_at");
		    res.body[0].should.have.a.property("repr");
                    done();
                });
        });
    });
});
