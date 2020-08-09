function admin(req, res, next) {
  if (req.user.role != "admin")
    return res.status(403).send({message:'You Are NOT Authorized'});
  next();
}
module.exports = admin;
