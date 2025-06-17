require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const API_URL = process.env.API_URL;

describe("GET /users", () => {
  it("should return 200 OK", (done) => {
    chai
      .request(API_URL)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
