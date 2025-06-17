const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;


chai.use(chaiHttp);
console.log(chaiHttp);


describe("GET /users", () => {
  

  it("should return all users", (done) => {
  

    chai
      .request("http://localhost:3000")
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});


describe("GET /products", () => {
  

  it("should return all product", (done) => {
    
    chai
      .request("http://localhost:3000")
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});