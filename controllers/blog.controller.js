const Blog = require("../models/blog.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const uploadImage = require("../utils/uploadImage");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const user = req.user._id;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingBlog = await Blog.findOne({ title, user: user });
  if (existingBlog) {
    throw new ApiError(400, "You already have a blog with this title");
  }
  if (!req.file) {
    throw new ApiError(400, "Image is required");
  }
  const image = await uploadImage(req.file);
  const blog = await Blog.create({
    title,
    description,
    image,
    user,
  });
  if (!blog) {
    throw new ApiError(500, "Something went wrong while creating blog");
  }
  return res.status(201).json({
    data: blog,
    code: 200,
    message: "Blog created successfully",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  let condition = { isDelete: false };
  const blogs = await Blog.paginate(condition, {
    page,
    limit,
    populate: [
      {
        path: "user",
        select: "name profileImage email",
      },
      {
        path: "comments",
        populate: [
          { path: "user", select: "name profileImage email" },
          {
            path: "replies",
            populate: { path: "user", select: "name profileImage email" },
          },
        ],
      },
    ],
  });
  if (!blogs) {
    throw new ApiError(404, "Blogs not fetched");
  }
  return res.status(200).json({
    data: blogs,
    code: 200,
    message: "Blogs fetched successfully",
  });
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("user", "name profileImage email")
    .populate({
      path: "comments",
      populate: [
        { path: "user", select: "name profileImage email" },
        {
          path: "replies",
          populate: { path: "user", select: "name profileImage email" },
        },
      ],
    });
  if (!blog) {
    throw new ApiError(404, "Blogs not found");
  }
  return res.status(200).json({
    data: blog,
    code: 200,
    message: "Blogs fetched successfully",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blogs not found");
  }
  if (blog.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this blog");
  }
  if (blog.isDelete === true) {
    throw new ApiError(409, "Blog already deleted");
  }
  blog.isDelete = true;
  await blog.save();
  return res.status(200).json({
    code: 200,
    message: "Blog deleted successfully",
  });
});

const editBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blogs not found");
  }
  if (blog.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to edit this blog");
  }
  if (req.file) {
    blog.image = await uploadImage(req.file);
  }

  if (title) blog.title = title;
  if (description) blog.description = description;
  await blog.save();
  return res.status(201).json({
    data: blog,
    code: 200,
    message: "Blog updated successfully",
  });
});

module.exports = { createBlog, getBlogs, getBlogById, deleteBlog, editBlog };
