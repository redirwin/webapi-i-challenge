const express = require("express");

const Data = require("./data/db");

const server = express();

server.use(express.json);
