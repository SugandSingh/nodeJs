const model = require("../model/product");
const Product = model.Product;
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newData = await product.save();
    res.status(201).json({ status: "added successfully", data: newData });
  } catch (err) {
    res.status(400).json({ status: "Validation error", data: err });
  }
};
exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json({ status: "successfully", data: product });
  } catch (error) {
    res.json({ status: "Failed", data: error });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(201).json({ status: "successfully", data: product ?? {} });
  } catch (error) {
    res.json({ status: "Failed", data: error });
  }
};
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json({ status: " updtaed successfully", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json({ status: "updtaed successfully", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    res
      .status(201)
      .json({ status: "deleted product successfully", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
};
