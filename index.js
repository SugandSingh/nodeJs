const express = require("express");
const app = express();
const morgan = require("morgan");
const productRoutre = require("./routes/product");
const authRoutre = require("./routes/auth");
const userRoutre = require("./routes/user");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
}
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log(token);
    const decoded = jwt.verify(token, publicKey,{ algorithm: 'RS256' });
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.json());
app.use("/api/auth", authRoutre.routre);
app.use("/api/product", auth, productRoutre.routre);
app.use("/api/user", userRoutre.routre);

app.listen(8080);
