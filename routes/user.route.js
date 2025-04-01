const express = require("express");
const upload = require("../config/multer.config");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router
  .route("/")
  .post(upload.single("profileImage"), userController.register)
  .get(auth, userController.getProfile);

router.route("/login").post(userController.login);

module.exports = router;
