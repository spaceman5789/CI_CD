const http = require("node:http");
const { handler } = require("./app");

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = http.createServer(handler);
server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
