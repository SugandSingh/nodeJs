const model = require("../model/user");
const User = model.User;
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  const token = jwt.sign({ email: req.body.email }, "shhhhh");
  user.token = token;
  try {
    const newData = await user.save();
    res.status(201).json({ status: "added successfully", data: newData });
  } catch (err) {
    res.status(400).json({ status: "Validation error", data: err });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json({ status: "successfully", data: user });
  } catch (error) {
    res.json({ status: "Failed", data: error });
  }
};
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json({ status: "successfully", data: user });
  } catch (error) {
    res.json({ status: "Failed", data: error });
  }
};
exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json({ status: " updtaed successfully", data: user });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json({ status: " updtaed successfully", data: user });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    res.status(201).json({ status: "deleted users successfully", data: user });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
};
