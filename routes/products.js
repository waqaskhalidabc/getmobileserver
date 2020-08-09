var express = require('express');
var router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateProduct = require("../middlewares/validateProduct");
var {Product} =require('../models/products');


//get product

router.get("/", async (req, res) => {
    try {
      let p = await Product.find();
      if (!p)
        return res.status(400).send("Product With given ID is not present"); 
      return res.send(p); 
    } catch (err) {
      return res.status(400).send("Invalid ID"); 
    }
  });

router.get("/:id", async (req, res) => {
    try {
      let p = await Product.findById(req.params.id);
      if (!p)
        return res.status(400).send("Product With given ID is not present"); 
      return res.send(p); //everything is ok
    } catch (err) {
      return res.status(400).send("Invalid ID"); 
    }
  });

//update a record
router.put("/:id", validateProduct,async (req, res) => {
    let p = await Product.findById(req.params.id);
    p.title = req.body.title;
    p.price = req.body.price;
    p.description=req.body.description;
    p.ram=req.body.ram;
    p.contact=req.body.contact;

    await p.save();
    return res.send(p);
  });



//update product
router.delete("/:id",auth,admin, async (req, res) => {
    let p = await Product.findByIdAndDelete(req.params.id);
    return res.send(p);
  });
  //Insert product
  router.post("/",auth,validateProduct, async (req, res) => {
    let p = new Product();
    p.title = req.body.title;
    p.price = req.body.price;
    p.description=req.body.description;
    p.ram=req.body.ram;
    p.contact=req.body.contact;
    await p.save();
    return res.send(p);
  });



module.exports = router;
