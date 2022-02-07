const { asyncWrapper } = require("../../middlewares/asyncWrapper");
const { Admin } = require("../../db/models/adminModel");
const jwt = require("jsonwebtoken");
const { hashFunction, compareHashe } = require("../../util/hashPassword");
const { createCustomError } = require("../../services/errors/custom-error");
const _ = require("lodash");
const jwtSecrest = process.env.JWT_SECRET_KEY;

//METHOD [Post]
/** end point  api/v1/admin */
const adminAuthSignUp = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await hashFunction(password);

  //console.log(hashedPassword);
  const admin = await Admin.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.status(200).json({
    success: true,
    msg: ` ${(admin, firstName)} ${(admin, lastName)} account created `,
    // data: { admin },
  });
});

//METHOD [Post]
/** end point  api/v1/admin */
const adminAuthLogin = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  //console.log("admin", req.body);

  const adminUser = await Admin.findOne({
    where: {
      email,
    },
  });

  if (!adminUser)
    return next(
      createCustomError("email or password combination incorrect", 401)
    );

  const hashedPassword = adminUser.password;
  //console.log(hashedPassword);
  const isValid = await compareHashe(password, hashedPassword);
  console.log(isValid);
  if (!isValid)
    return next(
      createCustomError("email or password combination incorrect", 401)
    );
  // generate atoken
  const tokenObject = { id: adminUser.id, email: adminUser.email };
  //console.log(tokenObject);
  const token = await jwt.sign({ tokenObject }, jwtSecrest, {
    expiresIn: "30d",
  });
  res.status(200).json({
    success: true,
    token: token,
    data: { adminUser },
  });
});

//METHOD [Post]
/** end point  api/v1/admin */
const deleteAdminAcc = asyncWrapper(async (req, res, next) => {
  console.log("admin", req.user);
});

module.exports = {
  adminAuthSignUp,
  adminAuthLogin,
  deleteAdminAcc,
};
