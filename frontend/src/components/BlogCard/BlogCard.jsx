import { Box, Grid2, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import './BlogCard.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const BlogCard = ({blog, handleBlogClick}) => {

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(blog.likeCount);
    const likeBlog = async () => {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        try {
            await axios.put(`http://localhost:3000/blog/like/${blog._id}`);
        } catch (error) {
            console.log(error);
            setIsLiked(false);
            setLikeCount(likeCount);
        }
    }
  return (
    <Paper elevation={10} className='cardContainer' sx={{cursor: 'pointer'}}>
    <Grid2>
            <Box onClick={() => handleBlogClick(blog._id)} sx={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
            <Grid2 size={{md: 2.5}} className='cardImageContainer'>
                <img src={blog?.img} className='blogImage'/>
            </Grid2>
            <Grid2 size={{md: 9.5}} className='cardDescriptionContainer'>
                <Typography variant='h5' className='blogTitle'>{blog.heading}</Typography>
                <Typography className='blogDescription' dangerouslySetInnerHTML={{ __html: blog.content }}/>
            </Grid2>
            </Box>
            <Grid2 container className='cardFooter'>
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
    </Paper>
  )
}

export default BlogCard