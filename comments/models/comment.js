const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema of 'Comment' document.
// The field '_id', which is appended by MongoDB automatically, is
// used as a commentId.
// 'Comment' document is transformed to the following structure when jsonified.
// {
//   commentId: String,
//   postId: String,
//   content: String,
//   status: String,
// }
const commentSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.commentId = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

module.exports = mongoose.model('comment', commentSchema);
