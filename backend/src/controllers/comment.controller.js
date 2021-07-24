/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import Blog from '../models/blog.model';
import Comment from '../models/comment.model';

const postOne = async (req, res) => {
  try {
    const article = await Blog.findOne({ _id: req.params.id });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    const comment = new Comment({
      name: req.body.name,
      message: req.body.message,
    });
    const comments = await comment.save();
    const appendComment = article.comments.push(comments);
    const countIncrement = article.comment_counts++;
    const savedArticle = await article.save();
    return res.status(201).json({ message: savedArticle });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default postOne;
