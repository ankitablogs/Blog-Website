import axios from "axios";
import { useEffect } from "react";
import { useParams} from "react-router";
import { Grid2, Typography } from '@mui/material'
import React, { useState } from 'react'
import './BlogPage.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const likeBlog = async () => {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URI}blog/like/${blog._id}`);
        } catch (error) {
            console.log(error);
            setIsLiked(false);
            setLikeCount(likeCount);
        }
    }

  const fetchBlog = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}blog/${id}`);
      setBlog(response.data);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlog(id);
  }, [id]);

  return (
    <Grid2 container className='cardContainer1'>
            <Grid2 size={{md: 3}} className='cardImageContainer1'>
                <img src={blog?.img} className='blogImage1'/>
            </Grid2>
            <Grid2 size={{md: 9}} className='cardDescriptionContainer1'>
                <Typography variant='h5' className='blogTitle'>{blog.heading}</Typography>
                <Typography className='blogDescription1' dangerouslySetInnerHTML={{ __html: blog.content }}/>
                </Grid2>
            <Grid2 container className='cardFooter1'>
            <div style={{display: 'flex', flexDirection: 'row', marginRight: '10px'}}>
                <RemoveRedEyeOutlinedIcon/>
                <Typography style={{marginLeft: '2px'}}>{blog.viewCount}</Typography>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '10px'}}>
                
                {isLiked ? <FavoriteIcon sx={{color: '#ae6cff'}}/> : <FavoriteBorderIcon onClick={likeBlog}/>}
                    <Typography style={{marginLeft: '2px'}}>{likeCount}</Typography>
                </div>
                
                <Typography>{new Date(blog.date).toDateString()}</Typography>
            </Grid2>
    </Grid2>
  );
}

export default BlogPage;