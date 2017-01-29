import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import request from "supertest";
import server from "../server";

const app = server.listen();
const should = chai.should();

describe("/cadastral_areas", function() {
    describe("GET cadastral area by id", function() {
        it("should return cadastral area object", (done) => {
            request(app)
                .get("/cadastral_areas/603970/2015-01-01")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    res.body.should.have.a.property("code");
                    res.body.should.have.a.property("name");
                    res.body.should.not.have.a.property("alike");
                    res.body.should.have.a.property("valid_at");
                    res.body.should.have.a.property("total_count");
                    res.body.should.have.a.property("total_area");
                    res.body.should.have.a.property("arable_land_count");
                    res.body.should.have.a.property("arable_land_area");
                    res.body.should.have.a.property("hop_garden_count");
                    res.body.should.have.a.property("hop_garden_area");
                    res.body.should.have.a.property("vineyard_count");
                    res.body.should.have.a.property("vineyard_area");
                    res.body.should.have.a.property("garden_count");
                    res.body.should.have.a.property("garden_area");
                    res.body.should.have.a.property("orchard_count");
                    res.body.should.have.a.property("orchard_area");
                    res.body.should.have.a.property("grassland_count");
                    res.body.should.have.a.property("grassland_area");
                    res.body.should.have.a.property("forest_count");
                    res.body.should.have.a.property("forest_area");
                    res.body.should.have.a.property("waterbody_count");
                    res.body.should.have.a.property("waterbody_area");
                    res.body.should.have.a.property("builtup_area_count");
                    res.body.should.have.a.property("builtup_area_area");
                    res.body.should.have.a.property("other_area_count");
                    res.body.should.have.a.property("other_area_area");
                    res.body.should.have.a.property("arable_land_count_ratio");
                    res.body.should.have.a.property("hop_garden_count_ratio");
                    res.body.should.have.a.property("vineyard_count_ratio");
                    res.body.should.have.a.property("garden_count_ratio");
                    res.body.should.have.a.property("orchard_count_ratio");
                    res.body.should.have.a.property("grassland_count_ratio");
                    res.body.should.have.a.property("forest_count_ratio");
                    res.body.should.have.a.property("waterbody_count_ratio");
                    res.body.should.have.a.property("builtup_area_count_ratio");
                    res.body.should.have.a.property("other_area_count_ratio");
                    res.body.should.have.a.property("arable_land_area_ratio");
                    res.body.should.have.a.property("hop_garden_area_ratio");
                    res.body.should.have.a.property("vineyard_area_ratio");
                    res.body.should.have.a.property("garden_area_ratio");
                    res.body.should.have.a.property("orchard_area_ratio");
                    res.body.should.have.a.property("grassland_area_ratio");
                    res.body.should.have.a.property("forest_area_ratio");
                    res.body.should.have.a.property("waterbody_area_ratio");
                    res.body.should.have.a.property("builtup_area_area_ratio");
                    res.body.should.have.a.property("other_area_area_ratio");
                    res.body.should.have.a.property("arable_land_area_average");
                    res.body.should.have.a.property("hop_garden_area_average");
                    res.body.should.have.a.property("vineyard_area_average");
                    res.body.should.have.a.property("garden_area_average");
                    res.body.should.have.a.property("orchard_area_average");
                    res.body.should.have.a.property("grassland_area_average");
                    res.body.should.have.a.property("forest_area_average");
                    res.body.should.have.a.property("waterbody_area_average");
                    res.body.should.have.a.property("builtup_area_area_average");
                    res.body.should.have.a.property("other_area_area_average");
                    done();
                });
        });
    });

    describe("GET cadastral areas alike", function() {
        it("should return array of cadastral area objects", (done) => {
            request(app)
                .get("/cadastral_areas/603970/2015-01-01/alike")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.an("array");
                    res.body[0].should.have.a.property("code");
                    res.body[0].should.have.a.property("name");
                    done();
                });
        });
    });

    describe("POST cadastral area progress in time", function() {
        it("should return an object of values for the given cadastral area", (done) => {
            request(app)
                .post("/cadastral_areas/603970/progress")
                .send({
                    "start": "2015-01-01",
                    "end": "2016-01-01"
                })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.an("object");
                    res.body.should.have.a.property("code");
                    res.body.should.have.a.property("name");
                    res.body.should.have.a.property("total_count");
                    res.body.total_count.should.be.an("array");
                    done();
                });
        });
    });

    describe("POST lookup cadastre by code or name", () => {
        it("should match by name", (done) => {
            request(app)
                .post("/cadastral_areas/lookup")
                .send({
                    "valid_at": "2015-01-01",
                    "query": "Adam"
                })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.an('array');
                    res.body[0].should.have.a.property("code");
                    res.body[0].should.have.a.property("name");
                    done();
                });
        });

        it("should match by code", (done) => {
            request(app)
                .post("/cadastral_areas/lookup")
                .send({
                    "valid_at": "2015-01-01",
                    "query": "6039"
                })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.an('array');
                    res.body[0].should.have.a.property("code");
                    res.body[0].should.have.a.property("name");
                    done();
                });
        });
    });
});
