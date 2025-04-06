import { Button, Grid, Stack, TextField, Typography, Paper, IconButton, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}user/profile`, data);
      setMessage(response.data);
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}blog/list`);
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editBlog = (id) => {
    navigate(`/admin/add/${id}`);
  };

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URI}blog/${id}`);
        setMessage(response.data);
        getBlogs();
      } catch (error) {
        console.log(error);
        setMessage('Error deleting blog');
      }
    }
  };

  const addBlog = () => {
    navigate(`/admin/add`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}user/profile`);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
      }
    };
    fetchData();
    getBlogs();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goBack = () => {
    navigate('/');
  };

  return (
    <Grid container sx={{ backgroundColor: '#f0e5ff54', minHeight: '100vh' }}>
      {/* Profile Section */}
      <Grid item xs={12} md={5} sx={{ 
        padding: { xs: 3, md: 6 },
        borderRight: { md: '1px solid #ddd' },
        borderBottom: { xs: '1px solid #ddd', md: 'none' }
      }}>
        <Stack gap={3}>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            sx={{ alignSelf: 'flex-start' }}
          >
            Back
          </Button>
          
          <Typography variant='h4' textAlign={'center'} sx={{ mb: 2 }}>
            UPDATE PROFILE
          </Typography>
          
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Bio", name: "bio", multiline: true, rows: 3 },
            { label: "Instagram", name: "insta" },
            { label: "LinkedIn", name: "linkedin" },
            { label: "Twitter", name: "twitter" },
            { label: "Facebook", name: "facebook" },
            { label: "Image Url", name: "img" }
          ].map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              variant="outlined"
              name={field.name}
              onChange={handleChange}
              value={data[field.name] || ''}
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline={field.multiline}
              rows={field.rows}
            />
          ))}
          
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={updateProfile}
            size="large"
            sx={{ mt: 2 }}
          >
            Update Profile
          </Button>
          
          {message && (
            <Typography 
              color={message.includes('Error') ? 'error' : 'success.main'}
              textAlign="center"
            >
              {message}
            </Typography>
          )}
        </Stack>
      </Grid>

      {/* Blogs Section */}
      <Grid item xs={12} md={7} sx={{ padding: { xs: 3, md: 6 } }}>
        <Stack gap={3}>
          <Typography variant='h4' textAlign={isMobile ? 'center' : 'left'} sx={{ mb: 2 }}>
            MANAGE BLOGS
          </Typography>
          
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={addBlog}
            startIcon={<AddIcon />}
            fullWidth={isMobile}
            sx={{ mb: 3 }}
          >
            Add New Blog
          </Button>
          
          <Divider />
          
          {blogs.slice().reverse().map((blog) => (
            <Paper 
              key={blog._id} 
              elevation={3} 
              sx={{ 
                padding: 2, 
                mb: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant='h6' sx={{ flexGrow: 1 }}>
                {blog.heading}
              </Typography>
              
              <div>
                <IconButton 
                  color="primary" 
                  onClick={() => editBlog(blog._id)}
                  aria-label="edit"
                >
                  <BorderColorIcon />
                </IconButton>
                
                <IconButton 
                  color="error" 
                  onClick={() => deleteBlog(blog._id)}
                  aria-label="delete"
                >
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </Paper>
          ))}
          
          {blogs.length === 0 && (
            <Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
              No blogs found. Create your first blog!
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Admin;