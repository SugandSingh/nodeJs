const model = require("../model/user");
const User = model.User;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);
exports.signUp = async (req, res) => {
  const user = new User(req.body);
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });

  const hash = bcrypt.hashSync(req.body.password, 10);
  console.log(hash);
  user.token = token;
  user.password = hash;
  try {
    const newData = await user.save();
    res.status(201).json({ status: "added successfully", token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "Validation error", data: err });
  }
};
exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    if (doc) {
      const isAuth = bcrypt.compareSync(req.body.password, doc.password);
      if (isAuth) {
        const token = jwt.sign({ email: req.body.email }, privateKey, {
          algorithm: "RS256",
        });
        doc.token = token;
        await doc.save(); 
        res.json({ status: "login successfully", token: token });
      }
    } else {
      res.json({ status: "no use found ", data: error });
    }
  } catch (error) {
    res.json({ status: "no user found " });
  }
};
