import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import request from "supertest";
import server from "../server";

const app = server.listen();
const should = chai.should();

describe("/regions", function() {
    describe("GET region by id", function() {
        it("should return region object", (done) => {
            request(app)
                .get("/regions/19/2015-01-01")
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

    describe("GET regions alike", function() {
        it("should return array of region objects", (done) => {
            request(app)
                .get("/regions/19/2015-01-01/alike")
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

    describe("POST region progress in time", function() {
        it("should return an object of values for the given region", (done) => {
            request(app)
                .post("/regions/116/progress")
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

    describe("POST lookup region by code or name", () => {
        it("should match by name", (done) => {
            request(app)
                .post("/regions/lookup")
                .send({
                    "valid_at": "2015-01-01",
                    "query": "Olom"
                })
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

        it("should match by code", (done) => {
            request(app)
                .post("/regions/lookup")
                .send({
                    "valid_at": "2015-01-01",
                    "query": "1"
                })
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

    describe("GET region geometry", function() {
        it("should return a GeoJSON", (done) => {
            request(app)
                .get("/regions/19/geometry")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    res.body.should.be.an("object");
                    res.body.should.have.a.property("geom");
                    done();
                });
        });
    });
});
