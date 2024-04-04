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

module.exports = {
  errorHandler,
};
