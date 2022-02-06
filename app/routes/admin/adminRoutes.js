const router = require("express").Router();

const {
  adminAuthSignUp,
  adminAuthLogin,
  deleteAdminAcc,
} = require("../../controllers/Admin/adminAuth");
const {
  adminSignUpValidation,
  adminLoginValidation,
} = require("../../middlewares/Validation");
const authenticationMiddleware = require("./../../middlewares/jwtAuth");

router.route("/signUp").post([adminSignUpValidation], adminAuthSignUp);
router.route("/logIn").post([adminLoginValidation], adminAuthLogin);
router.route("/delete").delete([authenticationMiddleware], deleteAdminAcc);

module.exports = router;
