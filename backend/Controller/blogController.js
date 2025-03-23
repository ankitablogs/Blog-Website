const Blog = require('../Model/blogModal');
const jwt = require('jsonwebtoken');
const getAllBlogs = async (req, res) => {
  const searchTerm = req.query.search || '';

  try {
    const query = searchTerm.trim()
      ? { heading: { $regex: searchTerm, $options: 'i' } }
      : {};
    const blogs = await Blog.find(query);
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      message: error.message
    });
  }
};


const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.viewCount = blog.viewCount + 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const editBlogById = async (req, res) => {
  
  try {
    const token = req.cookies.token;
      if (!token) {
          return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
      const {id} = jwt.verify(token, process.env.SECRET_CODE);
      if(id !== process.env.ADMIN_ID) {
          return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    await blog.save();
    res.json('Blog updated successfully');
  }
  catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}

const deleteBlogById = async (req, res) => {
  
  try {
    const token = req.cookies.token;
      if (!token) {
          return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
      const {id} = jwt.verify(token, process.env.SECRET_CODE);
      if(id !== process.env.ADMIN_ID) {
          return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.json('Blog deleted successfully');
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}



const increaseLikeCount = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.likeCount = blog.likeCount + 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const addBlog = async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
          return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
      const {id} = jwt.verify(token, process.env.SECRET_CODE);
      if(id !== process.env.ADMIN_ID) {
          return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
    const blog = new Blog(req.body);
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({
        message: error.message
        });
    }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  editBlogById,
  deleteBlogById,
  increaseLikeCount,
  addBlog
};