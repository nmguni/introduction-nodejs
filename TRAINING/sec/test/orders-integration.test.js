const { equal } = require("assert");
const fetch = require("node-fetch");
const server = require("../server");

describe("Order integration tests", () => {
  let instance = null;
  before(done => {
    instance = server({ port: null }, () => done());
  });

  after(done => {
    instance.close(() => done());
  });

  it("GET /orders should return a 200 status code", () => {
    return fetch(`http://localhost:${instance.address().port}/orders`).then(
      response => {
        equal(response.status, 200);
      }
    );
  });

  it("GET /orders should return a list", () => {
    return fetch(`http://localhost:${instance.address().port}/orders`)
      .then(response => response.json())
      .then(actual => {
        equal(Array.isArray(actual), true);
      });
  });

  it("POST /orders should return a new order", () => {
    return fetch(`http://localhost:${instance.address().port}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(actual => {
        equal(false, true);
      });
  });
});
