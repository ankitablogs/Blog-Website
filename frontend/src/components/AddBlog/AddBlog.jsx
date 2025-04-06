import { Box, Button, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { useNavigate, useParams } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddBlog = () => {
    const { id } = useParams();
    const [heading, setHeading] = useState('');
    const [message, setMessage] = useState('');
    const [img, setImg] = useState('');
    const [quillContent, setQuillContent] = useState('');
    const quillRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (quillRef.current && !editor) {
            const quillInstance = new Quill(quillRef.current, {
                theme: "snow",
                placeholder: 'Write something amazing...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],
                        [{ 'indent': '-1'}, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['clean'],
                        ['link', 'image', 'video']
                    ]
                }
            });

            quillInstance.on('text-change', () => {
                setQuillContent(quillInstance.root.innerHTML);
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
                editor.clipboard.dangerouslyPasteHTML(res.data.content);
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
                    content: quillContent,
                    img: img,
                });
                setMessage('Blog updated successfully');
            } else {
                await axios.post(`${import.meta.env.VITE_BACKEND_URI}blog/admin/add`, {
                    heading: heading,
                    content: quillContent,
                    img: img,
                });
                setMessage('Blog added successfully');
            }
            
            navigate('/admin/home');
        } catch (error) {
            console.log(error);
            setMessage('Failed to add blog');
        }
    };

    return (
        <Box sx={{ 
            padding: isMobile ? '16px 8px' : '24px 16px',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3
            }}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={goBack}
                    sx={{
                        minWidth: 'auto',
                        padding: '6px 12px'
                    }}
                >
                    <ArrowBackIcon sx={{ marginRight: 0.5 }} />
                    Back
                </Button>
                <Typography variant="h6" component="h1">
                    {id ? 'Edit Blog' : 'Add New Blog'}
                </Typography>
            </Box>
        
            <Stack spacing={3}>
                <TextField
                    required
                    label="Heading"
                    variant="outlined"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    fullWidth
                />
                
                <TextField
                    required
                    label="Image URL"
                    variant="outlined"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    fullWidth
                />
                
                <Box sx={{ 
                    height: '300px',
                    '& .ql-toolbar': {
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                    },
                    '& .ql-container': {
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                        height: isMobile ? 'calc(100% - 100px)' : 'calc(100% - 52px)',
                        fontSize: '16px'
                    }
                }}>
                    <div ref={quillRef}/>
                </Box>
                
                {message && (
                    <Typography 
                        variant="body2" 
                        color={message.includes('Failed') ? 'error.main' : 'success.main'}
                        sx={{ mt: 1}}
                    >
                        {message}
                    </Typography>
                )}
                <Button 
                    variant="contained" 
                    onClick={submitBlog} 
                    color='secondary'
                    size='large'
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default AddBlog;