import { loadNaf } from "./src";
const express = require("express");
var helmet = require("helmet");
var cors = require("cors");
import resolveRequest from "./src/resolve-request";
import createCache from "./src/cache";

const app = express();
app.use(helmet());
app.use(cors());

const VERSION = "v1";

function getResponse(req, naf, cache) {
  const { params, query } = req;
  const path = req.originalUrl;
  const { get, set } = cache;
  const previews = get(path);
  if (previews) {
    return [200, previews];
  }
  const response = resolveRequest({ path, params, query }, naf, VERSION);
  if (response) {
    set(path, response);
    return [200, response];
  }
  return [404, { error: "resource nof found", href: path }];
}

loadNaf(VERSION).then(function (naf) {
  const cache = createCache();

  app.get(`/${VERSION}/naf-rev2`, (req, res) => {
    const [status, response] = getResponse(req, naf, cache);
    res.status(status).json(response);
  });

  app.get(`/${VERSION}/naf-rev2/:niveau`, (req, res) => {
    const [status, response] = getResponse(req, naf, cache);
    res.status(status).json(response);
  });

  app.get(`/${VERSION}/naf-rev2/:niveau/:code`, (req, res) => {
    const [status, response] = getResponse(req, naf, cache);
    res.status(status).json(response);
  });

  app.listen(8080, () => {
    console.log("Serveur à l'écoute");
  });
});
