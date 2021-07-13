import cloudinary from '../utils/cloudinary';
import Blog from '../models/blog.model';

export const uploadImage = async (req, res, next) => {
  if (!req.files) return next();
  const { tempFilePath } = req.files.image;
  const { url, public_id: pid } = await cloudinary.upload(
    tempFilePath,
  );
  req.image = url;
  req.imageId = pid;
  return next();
};

export const blogExists = async (req, res, next) => {
  const blog = await Blog.findOne({
    _id: req.params.id,
  });
  if (!blog) {
    return res.status(404).json({ error: 'Blog do not exist' });
  }
  next();
};
