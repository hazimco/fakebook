const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (
    ["TokenExpiredError", "JsonWebTokenError", "NotBeforeError"].includes(
      err.name
    )
  ) {
    res.status(401).json({ error: err.message });
  } else {
    res.status(400).json({ error: err.message });
  }

  next(err);
};

const getTokenFromRequest = (req) => {
  const { authorization } = req.headers;

  return authorization?.startsWith("Bearer ")
    ? authorization.replace("Bearer ", "")
    : null;
};

/* adding user to request object */
const userExtractor = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedUser.id) {
    res.status(401).json({ error: "invalid token" });
    return;
  }

  const user = await User.findById(decodedUser.id);
  if (!user) {
    res.status(404).json({ error: "user not found" });
    return;
  }

  req.user = user;

  next();
};

module.exports = {
  errorHandler,
  userExtractor,
};
