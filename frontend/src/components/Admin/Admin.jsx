import { Button, Grid, Grid2, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [blogs, setBlogs] = useState([]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [message, setMessage] = useState('');

  const updateProfile = async() => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}user/profile`, data);
      setMessage(response.data);
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
  }

  const editBlog = async (id) => {
    navigate(`/admin/add/${id}`);
  }

  const deleteBlog = async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URI}blog/${id}`);
    setMessage(response.data);
    getBlogs();
  }

  const addBlog = () => {
    navigate(`/admin/add`);
  }


  useEffect(() => {
    const fetchData = async() => {
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
  }, []);

console.log(blogs)

  const goBack = () => {
    navigate('/');
  }

  return (
    <Grid2 container sx={{backgroundColor: '#f0e5ff54'}}>
      <Grid2 size={5}>
      <Stack gap={2} sx={{
        paddingLeft: 6, paddingRight: 6, paddingTop: 3, borderRight: '20px solid white'
      }} >
        <Button variant="contained" color="secondary" sx={{width: '80px', position: 'absolute', left: 10, top: 10}} onClick={goBack}><ArrowBackIcon sx={{marginRight: 0.2}}/>Back</Button>
        <Typography variant='h4' textAlign={'center'}>UPDATE PROFILE</Typography>
        <TextField label="Name" variant="outlined" name='name' onChange={handleChange} value={data?.name} InputLabelProps={{
    shrink: true,
  }}/>
        <TextField label="Email" variant="outlined" name='email' onChange={handleChange} value={data?.email} InputLabelProps={{
    shrink: true,
  }}/>
        <TextField label="Bio" variant="outlined" name='bio' onChange={handleChange} value={data?.bio} InputLabelProps={{
    shrink: true,
  }}/>
        <TextField label="Instagram" variant="outlined" name='insta' onChange={handleChange} value={data?.insta} InputLabelProps={{
    shrink: true,
  }}/>
        <TextField label="LinkedIn" variant="outlined" name='linkedin' onChange={handleChange} value={data?.linkedin} InputLabelProps={{
    shrink: true,
  }}/>
        <TextField label="Twitter" variant="outlined" name='twitter' onChange={handleChange} value={data?.twitter} InputLabelProps={{
    shrink: true,
  }}/>
        <TextField label="Facebook" variant="outlined" name='facebook' onChange={handleChange} value={data?.facebook} InputLabelProps={{
    shrink: true,
  }}/>
  <TextField label="Image Url" variant="outlined" name='img' onChange={handleChange} value={data?.img} InputLabelProps={{
    shrink: true,
  }}/>

        <Button variant="contained" color="secondary" onClick={updateProfile}>
          Update
        </Button>
        <Typography>{message}</Typography>
      </Stack>
      </Grid2>
      <Grid2 size={6.5} sx={{paddingLeft: 6, paddingRight: 6, paddingTop: 3}}>
        
        <Stack>
        {
          blogs.slice().reverse().map((blog) => {
            return <Typography key={blog._id} variant='h6' sx={{border: '1px solid grey', padding: '10px 10px', margin: '15px 0', borderRadius: '5px'}}>{blog.heading} <BorderColorIcon onClick={() => editBlog(blog._id)} sx={{marginLeft: '20px'}}/> <DeleteForeverIcon onClick={() => deleteBlog(blog._id)} sx={{marginLeft: '20px'}}/></Typography>
          })
        }
        <Button variant="contained" color="secondary" onClick={addBlog} >
          Add Blog
        </Button>
        </Stack>
      </Grid2>
    </Grid2>
  )
}

export default Admin