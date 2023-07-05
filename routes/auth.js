const express = require("express");
const routre = express.Router();
const controllerAuth = require("../controller/auth");

routre.post("/signUp", controllerAuth.signUp);
routre.post("/login", controllerAuth.login);

exports.routre = routre;
