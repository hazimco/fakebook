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

/* adding token to request object */
const tokenExtractor = (req, res, next) => {
  const { authorization } = req.headers;

  req.token = authorization?.startsWith("Bearer ")
    ? authorization.replace("Bearer ", "")
    : null;

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
