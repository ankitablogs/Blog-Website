import React, { useEffect, useState } from 'react'
import './Home.css'
import { Grid2, Link, Paper, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import axios from 'axios';

const LeftComponent = () => {
  const [data, setData] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/profile');
      setData(response.data);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchProfile();
  }
  , []);



  return (
    <Grid2 sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>
        <Grid2 sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        <div className='imageAndNameContainer'>
            <Paper elevation={10} className='imagePaper'>
            <img src={data?.img} className='image'/>
            </Paper>
            
        </div>
        <Typography variant='h5' className='name'>{data?.name}</Typography>
        <Typography>Email : {data?.email}</Typography>
        <Typography>Date of Birth : {data?.dob}</Typography>

        <Typography>Bio : {data?.bio}</Typography>
    
        </Grid2>
        <Grid2 sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        }}>
        <a href={data?.insta} target="_blank" rel="noopener noreferrer"><InstagramIcon/></a>
        <a href={data?.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
        <a href={data?.facebook} target="_blank" rel="noopener noreferrer"><FacebookIcon/></a>
        <a href={data?.twitter} target="_blank" rel="noopener noreferrer"><XIcon/></a>
        
        </Grid2>
    </Grid2>
  )
}

export default LeftComponent