const { createCustomError } = require("../services/errors/custom-error");

//admin

exports.adminSignUpValidation = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return next(createCustomError("sorry all filed are requred", 400));
  }
  // no error next
  next();
};

exports.adminLoginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createCustomError("sorry all filed are requred", 400));
  }
  // no error next
  next();
};
