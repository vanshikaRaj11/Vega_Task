const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { blogId } = req.params;

  if (!text) {
    throw new ApiError(400, "Text is required");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(400, "Blog not found");
  }
  const comment = new Comment({
    user: req.user._id,
    blog: blogId,
    text,
  });
  await comment.save();
  blog.comments.push(comment._id);
  await blog.save();
  return res.status(201).json({
    data: comment,
    code: 200,
    message: "Comment added successfully",
  });
});

const replyComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { blogId, commentId } = req.params;
  const parentComment = await Comment.findById(commentId);
  if (!parentComment) {
    throw new ApiError(404, "Comment not found");
  }
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(400, "Blog not found");
  }
  const reply = new Comment({
    user: req.user._id,
    blog: blogId,
    text,
  });
  await reply.save();
  parentComment.replies.push(reply._id);
  await parentComment.save();
  return res.status(201).json({
    data: reply,
    code: 200,
    message: "Reply added successfully",
  });
});

module.exports = { addComment, replyComment };
