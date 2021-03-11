const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log("Request method: ", req.method);
  console.log("Request URL: ", req.originalUrl);
  console.log(new Date().toString());
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then((user) => {
      if (!user) res.status(404).json({ message: "user not found" });
      else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

function validateUser(req, res, next) {
    const user = req.body
  if (!user) 
    res.status(400).json({ message: "missing user data" });
  else if (!user.name)
    res.status(400).json({ message: "missing required name field" });
  else next();
}

function validatePost(req, res, next) {
  if (!req.body) res.status(400).json({ message: "missing post data" });
  else if (!req.body.text || !req.body.user_id)
    res
      .status(400)
      .json({ message: "missing required text or user_id fields" });
  else next();
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
