const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    text: { type: String, trim: true },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.pre("findOne", function () {
  this.where({ isDelete: false });
});

commentSchema.pre("find", function () {
  this.where({ isDelete: false });
});

commentSchema.plugin(paginate);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
