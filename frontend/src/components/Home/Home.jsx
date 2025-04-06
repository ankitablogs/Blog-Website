import React, { useCallback, useEffect, useState } from 'react'
import PrimarySearchAppBar from '../Navbar/Navbar'
import LeftComponent from './LeftComponent'
import RightComponent from './RightComponent'
import { Grid2, useMediaQuery } from '@mui/material'
import './Home.css'
import axios from 'axios'




const Home = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  async function getBlogs(searchTerm) {
    console.log('called');
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}blog/list/?search=${searchTerm}`);
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
      searchWithDebounce(searchTerm);
  }, [searchTerm]);
  
  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const searchWithDebounce = useCallback(debounce(getBlogs, 300), []);

  return (
    <Grid2 className="home">
        <PrimarySearchAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <Grid2 container className="bodyContainer" sx={{
          overflow: isMobile ? 'auto' : 'hidden'
        }}>
            <Grid2  size={{md: 3, sx: 12}} className="leftComponent"
            sx={isMobile ? {height: '100%'} : {}}
            >
             <LeftComponent/>
            </Grid2>
            <Grid2 size={{md: 9, sx: 12}} className="rightComponent"
            sx={!isMobile ? {overflowY: 'auto'} : {height: 'auto'}}
            >
             <RightComponent blogs={blogs}/>
            </Grid2>
        </Grid2>
    </Grid2>
  )
}

export default Home