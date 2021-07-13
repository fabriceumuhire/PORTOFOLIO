import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    },
  },
  {
    timestamps: true,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  },
);

export default mongoose.model('Comment', CommentSchema);
