import React, { useCallback, useEffect, useState } from 'react'
import PrimarySearchAppBar from '../Navbar/Navbar'
import LeftComponent from './LeftComponent'
import RightComponent from './RightComponent'
import { Grid2 } from '@mui/material'
import './Home.css'
import axios from 'axios'




const Home = () => {
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
        <Grid2 container className="bodyContainer">
            <Grid2  size={{md: 3}} className="leftComponent">
             <LeftComponent/>
            </Grid2>
            <Grid2 size={{md: 9}} className="rightComponent">
             <RightComponent blogs={blogs}/>
            </Grid2>
        </Grid2>
    </Grid2>
  )
}

export default Home