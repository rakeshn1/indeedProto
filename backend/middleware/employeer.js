module.exports = function (req, res, next) {
  console.log("Is Enployeer: ", req.user.role);
  if (req.user.role != 1) return res.status(403).send("Forbidden");

  next();
};
