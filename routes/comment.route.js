const express = require("express");
const commentController = require("../controllers/comment.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.route("/:blogId").post(auth, commentController.addComment);

router
  .route("/:blogId/reply/:commentId")
  .post(auth, commentController.replyComment);

module.exports = router;
