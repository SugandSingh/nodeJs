const express = require("express");
const routre = express.Router();
const controllerUser  = require('../controller/user');


routre.get("/", controllerUser.getAllUser);
routre.get("/:id", controllerUser.getUser);
routre.post("/", controllerUser.createUser);
routre.put("/:id", controllerUser.replaceUser);
routre.patch("/:id", controllerUser.updateUser);
routre.delete("/:id", controllerUser.deleteUser);

exports.routre=routre