const express = require('express');
const { getAllBlogs, getBlogById, increaseLikeCount, addBlog, editBlogById, deleteBlogById } = require('../Controller/blogController');

const router = express.Router();
router.route('/list').get(getAllBlogs);

router.route('/:id').get(getBlogById)
.put(editBlogById)
.delete(deleteBlogById);

router.put('/like/:id', increaseLikeCount);

router.post('/admin/add', addBlog);
module.exports = router;