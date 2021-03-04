import { loadNaf } from "./src";
const express = require("express");
var helmet = require("helmet");
var cors = require("cors");

const app = express();
app.use(helmet());
app.use(cors());

const VERSION = "v1";

loadNaf(VERSION).then(function (getPath) {
  app.get(`/${VERSION}/naf-rev2`, (req, res) => {
    const path = `/${VERSION}/naf-rev2`;
    const response = getPath(path);
    res.status(200).json(response);
  });

  app.get(`/${VERSION}/naf-rev2/:niveau`, (req, res) => {
    const { niveau } = req.params;
    const path = req.originalUrl; //`/${VERSION}/naf-rev2/${niveau}`;
    const response = getPath(path, req.query, niveau);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "resource nof found", href: path });
    }
  });

  app.get(`/${VERSION}/naf-rev2/:niveau/:code`, (req, res) => {
    const { niveau, code } = req.params;
    const href = `/${VERSION}/naf-rev2/${niveau}/${code}`;
    const response = getPath(href, req.query, niveau, code);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "resource nof found", href });
    }
  });

  app.listen(8080, () => {
    console.log("Serveur à l'écoute");
  });
});
