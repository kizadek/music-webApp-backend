const jwt = require("jsonwebtoken");
const { createCustomError } = require("../services/errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createCustomError("NO TOKEN PROVIDED!", 401));
  }

  const token = authHeader.split(" ")[1];
  s;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.tokenObject;

    next();
  } catch (error) {
    next(createCustomError("NOT AUTHORIZED TO ACCESS THIS ROUTE! ", 401));
  }
};

module.exports = authenticationMiddleware;
