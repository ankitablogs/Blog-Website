const express = require('express');
const cors = require('cors');
const connect = require('./db');
const cookieParser = require('cookie-parser');
const app = express();
const blogRouter = require('./Route/Blog');
const userRouter = require('./Route/User');
const allowedOrigins = [
  'https://ankitablogs.vercel.app', // Deployed frontend
  'http://localhost:3000' // Local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(cookieParser());


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

connect();

app.use('/blog', blogRouter);
app.use('/user', userRouter);





