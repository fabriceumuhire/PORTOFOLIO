import mongoose from 'mongoose';

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  comments: [
    { type: mongoose.Schema.Types.ObjectID, ref: 'Comment' },
  ],
});

export default mongoose.model('Blog', BlogSchema);
