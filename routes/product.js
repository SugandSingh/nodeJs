const express = require("express");
const routre = express.Router();
const controllerProduct = require("../controller/product");
routre.get("/", controllerProduct.getAllProduct);
routre.get("/:id", controllerProduct.getProduct);
routre.post("/", controllerProduct.createProduct);
routre.put("/:id", controllerProduct.replaceProduct);
routre.patch("/:id", controllerProduct.updateProduct);
routre.delete("/:id", controllerProduct.deleteProduct);

exports.routre = routre;
