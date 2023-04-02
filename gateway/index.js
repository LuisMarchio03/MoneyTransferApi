const httpProxy = require("express-http-proxy");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
app.use(logger("dev"));
app.use(cors());

function selectProxyHost(req) {
  const { path } = req;
  const pathParts = path.split("/");
  const pathPrefix = pathParts[1];

  switch (pathPrefix) {
    case "transaction":
      return "http://localhost:4001";
    case "users":
      return "http://localhost:4000";
    default:
      return "http://localhost:4000";     
  }
}

app.use((req, res, next) => {
  httpProxy(selectProxyHost(req))(req, res, next);
});

app.listen(8080, () => {
  console.log("API Gateway running! in port 8080");
});