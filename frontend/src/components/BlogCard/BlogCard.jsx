import { Box, Paper, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const BlogCard = ({ blog, handleBlogClick }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(blog.likeCount);

    const likeBlog = async (e) => {
        e.stopPropagation();
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

    return (
        <Paper 
            elevation={3} 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: { xs: '8px 4px', sm: '12px 8px' },
                padding: { xs: '10px', sm: '12px' },
                borderRadius: 2,
                border: '2px solid #943cff65',
                cursor: 'pointer',
                width: 'calc(100% - 16px)',
                maxWidth: '100%',
                boxSizing: 'border-box',
                position: 'relative', // Added for footer positioning
                minHeight: isMobile ? 'auto' : 180 // Ensure consistent height
            }}
            onClick={() => handleBlogClick(blog._id)}
        >
            {/* Main Content */}
            <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: { xs: 1.5, sm: 2 },
                flexGrow: 1,
                mb: 1.5
            }}>
                {/* Image Container */}
                <Box sx={{
                    width: isMobile ? '100%' : 150,
                    height: isMobile ? 120 : 150,
                    flexShrink: 0,
                    mb: isMobile ? 1.5 : 0
                }}>
                    <img 
                        src={blog?.img} 
                        alt={blog.heading}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 6
                        }}
                    />
                </Box>
                
                {/* Text Content */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    flexGrow: 1
                }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 'bold', 
                        mb: 0.5,
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}>
                        {blog.heading}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: { xs: '0.8rem', sm: '0.9rem' }
                        }}
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </Box>
            </Box>
            
            {/* Footer - Now aligned to bottom right */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2,
                marginTop: 'auto',
                paddingTop: 1
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <RemoveRedEyeOutlinedIcon fontSize="small" sx={{ fontSize: '18px' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        {blog.viewCount}
                    </Typography>
                </Box>
                
                <Box 
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    onClick={likeBlog}
                >
                    {isLiked ? 
                        <FavoriteIcon fontSize="small" sx={{ color: '#ae6cff', fontSize: '18px' }} /> : 
                        <FavoriteBorderIcon fontSize="small" sx={{ fontSize: '18px' }} />
                    }
                    <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        {likeCount}
                    </Typography>
                </Box>
                
                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                    {new Date(blog.date).toDateString()}
                </Typography>
            </Box>
        </Paper>
    )
}

export default BlogCard