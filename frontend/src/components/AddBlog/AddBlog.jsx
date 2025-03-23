import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.core.css";
import { useNavigate, useParams } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddBlog = () => {
    const { id } = useParams();
    const [heading, setHeading] = useState('');
    const [message, setMessage] = useState('');
    const [img, setImg] = useState('');
    const [quillContent, setQuillContent] = useState(''); // State variable for Quill content

    const quillRef = useRef(null); // Reference for the Quill editor
    const [editor, setEditor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (quillRef.current && !editor) {
            const quillInstance = new Quill(quillRef.current, {
                theme: "snow",
                placeholder: 'Write something amazing...',

            });

            quillInstance.on('text-change', () => {
                setQuillContent(quillInstance.root.innerHTML); // Update quillContent state with HTML content
            });

            setEditor(quillInstance);
        }
    }, [editor]);

    const getBlog = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}blog/${id}`);
            setHeading(res.data.heading);
            setQuillContent(res.data.content);
            setImg(res.data.img);
            if (editor) {
                editor.clipboard.dangerouslyPasteHTML(res.data.content); // Prepopulate Quill content
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id) {
            getBlog();
        }
    }, [id, editor]);

    const goBack = () => {
        navigate('/admin/home');
    }

    const submitBlog = async () => {
        try {
            if(id) {
                await axios.put(`${import.meta.env.VITE_BACKEND_URI}blog/${id}`, {
                    heading: heading,
                    content: quillContent, // Use quillContent instead of content
                    img: img,
                });
                setMessage('Blog updated successfully');
            } else {
                await axios.post(`${import.meta.env.VITE_BACKEND_URI}blog/admin/add`, {
                    heading: heading,
                    content: quillContent, // Use quillContent instead of content
                    img: img,
                });
                setMessage('Blog added successfully');
            }
            
            navigate('/');
        } catch (error) {
            console.log(error);
            setMessage('Failed to add blog');
        }
    };

    return (
        <Stack padding={15}>
            <Button variant="contained" color="secondary" sx={{width: '80px', position: 'absolute', left: 10, top: 10}} onClick={goBack}><ArrowBackIcon sx={{marginRight: 0.2}}/>Back</Button>
        
            <TextField
                required
                id="standard-required"
                label="Heading"
                variant="standard"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                sx={{ marginBottom: '50px' }}
            />
            <TextField
                required
                id="standard-required"
                label="Image Url"
                variant="standard"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                sx={{ marginBottom: '50px' }}
            />
            <div ref={quillRef} style={{ height: '300px',
                marginBottom: '50px'
             }} />
            <Button variant="contained" onClick={submitBlog} color='secondary'>Submit</Button>
            <Typography>{message}</Typography>
        </Stack>
    );
};

export default AddBlog;