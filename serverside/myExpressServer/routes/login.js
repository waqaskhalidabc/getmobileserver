var express = require("express");
var router = express.Router();
const _ = require("lodash");
var bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const  validateRegister= require("../middlewares/validateUser");
const jwt = require("jsonwebtoken");
var { Login } = require("../models/login");

/*router.get("/login", async (req, res) => {
    try {

      let l = await Login.findById(req.params.id);
      if (!l)
        return res.status(400).send("user With given ID is not present"); 
      return res.send(l); //everything is ok
    } catch (err) {
      return res.status(400).send("Invalid ID"); 
    }
  });*/

router.post("/login", async (req, res) => {
  try {
    //console.log(req.user);
    let l = await Login.findOne({ email: req.body.email });
    if (!l) {
      throw new Error("inavalid username password !");
    }
    //let isValid = await bcrypt.compare(req.body.password, user.password);
    if (
      new String(req.body.password).valueOf() !=
      new String(l.password).valueOf()
    )
      {throw new Error("inavalid username password !");}
    //console.log(l.password);
    let token = jwt.sign(
      { _id: l._id, name: l.name, role: l.role },
      "jwtPrivateKey"
    );
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });

  }
});

router.delete("/:id", async (req, res) => {
  let l = await Login.findByIdAndDelete(req.params.id);
  return res.send(l);
});

router.post("/register", async (req, res) => {

try{
  let user = await Login.findOne({ email: req.body.email });
  if (user) {throw new Error("User with given Email already exist!");}
  //return res.status(400).send("User with given Email already exist");

  let l = new Login();
  l.name = req.body.name;
  l.email = req.body.email;

  l.password = req.body.password;
  await l.save();
  let token = jwt.sign(
    { _id: l._id, name: l.name, role: l.role },
    "jwtPrivateKey"
  );


  return res.send(token);

}
catch(error){
  res.status(400).send({ message: error.message });


}

  
});

module.exports = router;
