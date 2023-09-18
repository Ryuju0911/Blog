const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema of 'PostWithComments' document.
// 'PostWithComments' document is transformed to the following structure
// when jsonified.
// {
//   postId: String,
//   title: String,
//   comments: [{
//     commentId: String,
//     content: String,
//     status: String,
//   }],
// }
const postWithCommentsSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    comments: {
      type: [{
          commentId: String,
          content: String,
          status: String,
        }],
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

module.exports = mongoose.model('PostWithComments', postWithCommentsSchema);
