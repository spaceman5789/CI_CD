const test = require("node:test");
const assert = require("node:assert/strict");
const { handler } = require("../src/app");

function makeResponse() {
  return {
    statusCode: 0,
    headers: {},
    body: "",
    writeHead(status, headers) {
      this.statusCode = status;
      this.headers = headers;
    },
    end(payload) {
      this.body = payload;
    },
  };
}

test("health returns ok", () => {
  const res = makeResponse();
  handler({ url: "/health" }, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["content-type"], "application/json");
  assert.deepEqual(JSON.parse(res.body), { status: "ok" });
});

test("unknown path returns 404", () => {
  const res = makeResponse();
  handler({ url: "/missing" }, res);

  assert.equal(res.statusCode, 404);
  assert.equal(res.headers["content-type"], "application/json");
  assert.deepEqual(JSON.parse(res.body), { error: "not_found" });
});
