import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Grid2 as Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const loginUser = async() => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}user/login`, data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('tokenTimestamp', new Date().getTime());
            navigate('/');
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.message);
        }
    }

    return (
        <Grid
            direction={'column'}
            container
            gap={2}
            width={'20%'}
            margin={'auto'}
            marginTop={10}
        >
            <Typography variant="h4" textAlign={'center'}>
                ADMIN
            </Typography>

            <TextField
                id="filled-basic"
                label="Username"
                variant="filled"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                value={data.password}
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Button variant="contained" onClick={loginUser}>
                Login
            </Button>
            <Typography>{message}</Typography>
        </Grid>
    )
}

export default Login
