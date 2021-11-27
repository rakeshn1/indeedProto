module.exports = function (req, res, next) {
  console.log("Is Admin: ", req.user.role);
  if (req.user.role != 0) return res.status(403).send("Forbidden");

  next();
};
