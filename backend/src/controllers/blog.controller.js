/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import Blog from '../models/blog.model';

dotenv.config();
cloudinary.config('../utils/cloudinary.js');

export const getAll = async (req, res) => {
  try {
    const articles = await Blog.find();
    return res.status(200).json({ message: articles });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postOne = async (req, res) => {
  req.body.image = req.image;
  req.body.imageId = req.imageId;
  try {
    const articles = new Blog(req.body);
    const article = await articles.save();
    return res.status(201).json({ message: article });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const article = await Blog.findOne({
      _id: req.params.id,
    }).populate('comments');
    await article.views++;
    return res.status(200).json({ message: article });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const updateOne = async (req, res) => {
  const articles = await Blog.findOne({ _id: req.params.id });
  try {
    if (req.body.title) {
      articles.title = req.body.title;
    }
    if (req.body.content) {
      articles.content = req.body.content;
    }
    const article = await articles.save();
    return res.status(200).json({ message: article });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOne = async (req, res) => {
  cloudinary.v2.uploader.destroy(req.params.publicId, async () => {
    /* try {
            await Blog.findOne({ _id: req.params.id });
            res.status(200);
        } catch (error) {
            res.status(404);
            res.send({error: "Article not found"});
        } */
    await Blog.deleteOne({ _id: req.params.id });
    return res
      .status(204)
      .json({ message: 'Article deleted successfully' });
  });
};

export const likeOne = async (req, res) => {
  try {
    const likeArticle = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } },
    );
    const article = await Blog.findOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ message: 'Liked message', article });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
