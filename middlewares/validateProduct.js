const { validate } = require("../models/products");
function validateProduct(req, res, next) {
  let { error } = validate(req.body);
  if (error) return res.status(400).send({message:"Invalid Entries Fill all Fields"});
  next();
}
module.exports = validateProduct;