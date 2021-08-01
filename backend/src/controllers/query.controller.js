import Query from '../models/query.model';

export const postOne = async (req, res) => {
  const query = new Query({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  const queries = await query.save();
  return res
    .status(201)
    .json({ message: 'Query submitted successfully!', queries });
};

export const getAll = async (req, res) => {
  const post = await Query.find();
  return res.status(200).json({ message: post });
};

export const getOne = async (req, res) => {
  try {
    const query = await Query.findOne({ _id: req.params.id });
    return res.status(200).json({ message: query });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
