const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }],
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.pre("findOne", function () {
  this.where({ isDelete: false });
});

blogSchema.pre("find", function () {
  this.where({ isDelete: false });
});

blogSchema.plugin(paginate);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
