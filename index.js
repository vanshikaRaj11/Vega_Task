const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const blogRoutes = require("./routes/blog.route")
const commentRoutes = require("./routes/comment.route")
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
require("./config/database").dbconnect();

app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`APP Listen on Port ${PORT}`);
});
