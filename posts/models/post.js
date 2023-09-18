const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema of 'Post' document.
// The field '_id', which is appended by MongoDB automatically, is
// used as a postId.
// 'Post' document is transformed to the following structure when jsonified.
// {
//   postId: String,
//   title: String,
// }
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.postId = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

module.exports = mongoose.model('Post', postSchema);
