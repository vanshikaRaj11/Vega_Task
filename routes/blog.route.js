const express = require("express");
const upload = require("../config/multer.config");
const blogController = require("../controllers/blog.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router
  .route("/")
  .post(upload.single("image"), auth, blogController.createBlog)
  .get(auth, blogController.getBlogs);
router
  .route("/:id")
  .get(auth, blogController.getBlogById)
  .delete(auth, blogController.deleteBlog)
  .patch(upload.single("image"), auth, blogController.editBlog);

module.exports = router;
