import { Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard/BlogCard';
import axios from 'axios';
import { useNavigate } from 'react-router';

const RightComponent = ({blogs}) => {
  
  
  const navigate = useNavigate();
  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  }
  
  
  return (
    <Grid2 flexGrow={1}>
{
    blogs?.slice().reverse().map((blog) => {
        return <BlogCard blog={blog} handleBlogClick={handleBlogClick} key={blog.id} />;
    })
}
    </Grid2>
  )
}

export default RightComponent